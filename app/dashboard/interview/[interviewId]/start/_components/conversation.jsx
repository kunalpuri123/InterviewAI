"use client";
import Script from "next/script";
import { useState, useCallback, useEffect } from "react";
import { useConversation } from "@11labs/react";
import { db } from "@/utils/db"; // Drizzle ORM
import { UserPayment, MockInterview } from "@/utils/schema"; 
import { eq } from "drizzle-orm";
import Webcam from "react-webcam";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation"; // Import router
import ModelPrediction from "./ModelPrediction";
import Prepmate from "./prepmate.png"; // Corrected import

export function Conversation() {
  const [isPaid, setIsPaid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);
  const [interviewData, setInterviewData] = useState(null);
  const [conversationStatus, setConversationStatus] = useState("Disconnected");
  const [conversationId, setConversationId] = useState(null);
  const { user } = useUser();
  const router = useRouter(); // Corrected router initialization

  const conversation = useConversation({
    onConnect: () => console.log("Connected"),
    onDisconnect: () => console.log("Disconnected"),
    onMessage: (message) => console.log("Message:", message),
    onError: (error) => console.error("Error:", error),
  });

  useEffect(() => {
    if (typeof window.Razorpay !== "undefined") {
      setRazorpayLoaded(true);
    }
  }, []);

  useEffect(() => {
    const fetchPaymentStatus = async () => {
      if (!user) return; // Ensure user is available
      try {
        const userEmail = user.primaryEmailAddress?.emailAddress;
        const paymentData = await db
          .select()
          .from(UserPayment)
          .where(eq(UserPayment.userEmail, userEmail))
          .execute();

        if (paymentData.length > 0 && paymentData[0].hasPaid) {
          setIsPaid(true);
        }
      } catch (error) {
        console.error("Error fetching payment status:", error);
      }
    };

    fetchPaymentStatus();
  }, [user]);

  const startConversation = useCallback(async () => {
    if (!isPaid) {
      console.log("Please complete the payment first");
      return;
    }

    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      const id = await conversation.startSession({
        agentId: "HHBSc1OCIr1sm6Pcbrwr",
      });
      console.log("Conversation ID:", id);
      setConversationId(id);
      setConversationStatus("Listening");
    } catch (error) {
      console.error("Error starting conversation:", error);
      setConversationStatus("Error");
    }
  }, [conversation, isPaid]);

  const stopConversation = useCallback(async () => {
    try {
      await conversation.endSession();

      if (interviewData) {
        await db
          .update(MockInterview)
          .set({
            mockId: interviewData.mockId,
            createdAt: new Date().toISOString(),
          })
          .where(eq(MockInterview.id, interviewData.id))
          .execute();
        console.log("Interview status updated.");
      }

      const userEmail = user?.primaryEmailAddress?.emailAddress;
      if (userEmail) {
        await db
          .update(UserPayment)
          .set({ hasPaid: false })
          .where(eq(UserPayment.userEmail, userEmail))
          .execute();
        setIsPaid(false);
        console.log("Payment status set to false.");
      }

      if (conversationId) {
        router.push(`/dashboard/summary/${conversationId}`);
      } else {
        console.error("No conversation ID available.");
      }
    } catch (error) {
      console.error("Error stopping conversation:", error);
    }
  }, [conversation, user, interviewData, conversationId, router]);

  const initiatePayment = async () => {
    setLoading(true);
    try {
      if (!razorpayLoaded) {
        console.error("Razorpay is not loaded yet. Please try again.");
        setLoading(false);
        return;
      }

      const response = await fetch("https://serverprepmate-1.onrender.com/order", {
        method: "POST",
        body: JSON.stringify({
          amount: 150000, // ₹1500 in paise
          currency: "INR",
          receipt: "qwsaq1",
        }),
        headers: { "Content-Type": "application/json" },
      });

      const order = await response.json();

      const options = {
        key: "rzp_test_IMa6OmxshE0B6f",
        amount: order.amount,
        currency: order.currency,
        name: "PrepMate",
        description: "Test Transaction",
        image: Prepmate, 
        order_id: order.id,
        handler: async function (response) {
          try {
            const validateRes = await fetch("https://serverprepmate-1.onrender.com/order/validate", {
              method: "POST",
              body: JSON.stringify({ ...response, order_id: order.id }),
              headers: { "Content-Type": "application/json" },
            });

            if (!validateRes.ok) throw new Error("Payment verification failed.");

            setIsPaid(true);
            alert("✅ Payment verified successfully. You can now start the conversation.");
          } catch (error) {
            console.error("❌ Payment verification failed:", error);
            alert("Payment verification failed. Please try again.");
          }
        },
        prefill: {
          name: "Web Dev Matrix",
          email: "webdevmatrix@example.com",
          contact: "9000000000",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.on("payment.failed", function (response) {
        alert(response.error.description);
      });
      rzp1.open();
    } catch (error) {
      console.error("Payment initiation failed:", error);
      alert("Payment initiation failed. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4 bg-black-100 rounded-lg shadow-md">
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="beforeInteractive"
        onLoad={() => setRazorpayLoaded(true)}
      />

      <h2 className="text-lg font-semibold text-white">PrepMate AI Interview</h2>
      
      {isPaid && <Webcam style={{ height: 300, width: "100%" }} mirrored={true} />}
      {isPaid && <ModelPrediction />}

      {!isPaid ? (
        <>
          <p className="text-lg text-gray-700 mb-4">Pay to start your Mock Interview</p>
          <button onClick={initiatePayment} disabled={loading || !razorpayLoaded} className="px-4 py-2 bg-green-500 text-white rounded-lg">
            {loading ? "Processing..." : "Pay Now"}
          </button>
        </>
      ) : (
        <>
          <button onClick={startConversation} className="px-4 py-2 bg-blue-500 text-white rounded-lg">Start</button>
          <button onClick={stopConversation} className="px-4 py-2 bg-red-500 text-white rounded-lg">Stop</button>
        </>
      )}
    </div>
  );
}
