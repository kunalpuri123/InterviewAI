export interface ValidationResult {
  requirement: string
  passed: boolean
  message: string
  score: number
}

export class WebValidator {
  static validateNavigation(doc: Document, css: string, js: string, requirements: string[]): ValidationResult[] {
    const results: ValidationResult[] = []

    requirements.forEach((requirement, index) => {
      let passed = false
      let message = ""
      let score = 0

      const reqLower = requirement.toLowerCase()

      if (reqLower.includes("navigation") || reqLower.includes("navbar")) {
        const nav = doc.querySelector("nav") || doc.querySelector(".navbar") || doc.querySelector(".nav")
        passed = !!nav
        message = passed
          ? "✅ Navigation element found"
          : "❌ Navigation element missing (use <nav> tag or .navbar class)"
        score = passed ? 17 : 0
      } else if (reqLower.includes("hamburger") || reqLower.includes("mobile menu")) {
        const hamburger =
          doc.querySelector(".hamburger") ||
          doc.querySelector(".menu-toggle") ||
          doc.querySelector("[class*='hamburger']") ||
          doc.querySelector("[class*='menu-toggle']")
        passed = !!hamburger
        message = passed
          ? "✅ Hamburger menu element found"
          : "❌ Hamburger menu element missing (add class 'hamburger' or 'menu-toggle')"
        score = passed ? 17 : 0
      } else if (reqLower.includes("5") && reqLower.includes("link")) {
        const links = doc.querySelectorAll("nav a, .navbar a, .nav a")
        passed = links.length >= 5
        message = passed
          ? `✅ Found ${links.length} navigation links`
          : `❌ Only ${links.length} navigation links found, need at least 5`
        score = passed ? 16 : 0
      } else if (reqLower.includes("responsive") || reqLower.includes("768px")) {
        const hasMediaQuery = css.includes("@media") && (css.includes("768px") || css.includes("max-width"))
        passed = hasMediaQuery
        message = passed
          ? "✅ Responsive media queries found"
          : "❌ No responsive media queries found (use @media with max-width: 768px)"
        score = passed ? 17 : 0
      } else if (reqLower.includes("hover") || reqLower.includes("transition")) {
        const hasHover = css.includes(":hover")
        const hasTransition = css.includes("transition")
        passed = hasHover && hasTransition
        message = passed ? "✅ Hover effects and transitions found" : "❌ Missing hover effects or transitions"
        score = passed ? 16 : 0
      } else if (reqLower.includes("semantic")) {
        const hasSemanticElements = !!(
          doc.querySelector("nav") ||
          doc.querySelector("header") ||
          doc.querySelector("main")
        )
        passed = hasSemanticElements
        message = passed
          ? "✅ Semantic HTML elements found"
          : "❌ Use semantic HTML elements like <nav>, <header>, <main>"
        score = passed ? 17 : 0
      }

      results.push({ requirement, passed, message, score })
    })

    return results
  }

  static validateTodoApp(doc: Document, css: string, js: string, requirements: string[]): ValidationResult[] {
    const results: ValidationResult[] = []

    requirements.forEach((requirement, index) => {
      let passed = false
      let message = ""
      let score = 0

      const reqLower = requirement.toLowerCase()

      if (reqLower.includes("add") && reqLower.includes("todo")) {
        const input = doc.querySelector("input[type='text']") || doc.querySelector("input:not([type])")
        const button = doc.querySelector("button") || doc.querySelector("input[type='submit']")
        passed = !!(input && button)
        message = passed ? "✅ Todo input and add button found" : "❌ Missing todo input field or add button"
        score = passed ? 13 : 0
      } else if (reqLower.includes("validation")) {
        const hasValidation = js.includes("trim()") || js.includes("length") || js.includes("required")
        passed = hasValidation
        message = passed ? "✅ Input validation logic found" : "❌ No input validation found (check for empty inputs)"
        score = passed ? 12 : 0
      } else if (reqLower.includes("complete") || reqLower.includes("checkbox")) {
        const hasCheckboxLogic = js.includes("checked") || js.includes("completed") || js.includes("done")
        passed = hasCheckboxLogic
        message = passed ? "✅ Todo completion logic found" : "❌ No todo completion logic found"
        score = passed ? 13 : 0
      } else if (reqLower.includes("edit") && reqLower.includes("inline")) {
        const hasEditLogic = js.includes("edit") || js.includes("contentEditable") || js.includes("input")
        passed = hasEditLogic
        message = passed ? "✅ Edit functionality found" : "❌ No inline edit functionality found"
        score = passed ? 12 : 0
      } else if (reqLower.includes("delete")) {
        const hasDeleteLogic = js.includes("delete") || js.includes("remove") || js.includes("splice")
        passed = hasDeleteLogic
        message = passed ? "✅ Delete functionality found" : "❌ No delete functionality found"
        score = passed ? 12 : 0
      } else if (reqLower.includes("filter")) {
        const hasFilterLogic =
          js.includes("filter") || (js.includes("all") && js.includes("active") && js.includes("completed"))
        passed = hasFilterLogic
        message = passed ? "✅ Filter functionality found" : "❌ No filter functionality found (All, Active, Completed)"
        score = passed ? 13 : 0
      } else if (reqLower.includes("localstorage") || reqLower.includes("persist")) {
        const hasLocalStorage = js.includes("localStorage") || js.includes("setItem") || js.includes("getItem")
        passed = hasLocalStorage
        message = passed ? "✅ localStorage persistence found" : "❌ No localStorage persistence found"
        score = passed ? 13 : 0
      } else if (reqLower.includes("count")) {
        const hasCountLogic = js.includes("count") || js.includes("length")
        passed = hasCountLogic
        message = passed ? "✅ Todo count functionality found" : "❌ No todo count display found"
        score = passed ? 12 : 0
      }

      results.push({ requirement, passed, message, score })
    })

    return results
  }

  static validateReactCounter(doc: Document, css: string, js: string, requirements: string[]): ValidationResult[] {
    const results: ValidationResult[] = []

    requirements.forEach((requirement, index) => {
      let passed = false
      let message = ""
      let score = 0

      const reqLower = requirement.toLowerCase()

      if (reqLower.includes("usestate")) {
        const hasUseState = js.includes("useState")
        passed = hasUseState
        message = passed ? "✅ useState hook found" : "❌ useState hook not found"
        score = passed ? 13 : 0
      } else if (reqLower.includes("increment")) {
        const hasIncrement = js.includes("increment") || js.includes("+") || js.includes("+ 1")
        passed = hasIncrement
        message = passed ? "✅ Increment functionality found" : "❌ No increment functionality found"
        score = passed ? 12 : 0
      } else if (reqLower.includes("decrement")) {
        const hasDecrement = js.includes("decrement") || js.includes("-") || js.includes("- 1")
        passed = hasDecrement
        message = passed ? "✅ Decrement functionality found" : "❌ No decrement functionality found"
        score = passed ? 12 : 0
      } else if (reqLower.includes("reset")) {
        const hasReset = js.includes("reset") || js.includes("= 0")
        passed = hasReset
        message = passed ? "✅ Reset functionality found" : "❌ No reset functionality found"
        score = passed ? 13 : 0
      } else if (reqLower.includes("display") && reqLower.includes("count")) {
        const hasDisplay = js.includes("count") || js.includes("value")
        passed = hasDisplay
        message = passed ? "✅ Count display found" : "❌ No count display found"
        score = passed ? 12 : 0
      } else if (reqLower.includes("step") && reqLower.includes("input")) {
        const hasStepInput = js.includes("step") || js.includes("input")
        passed = hasStepInput
        message = passed ? "✅ Step size input found" : "❌ No step size input found"
        score = passed ? 13 : 0
      } else if (reqLower.includes("prevent") && reqLower.includes("negative")) {
        const hasNegativeCheck = js.includes("< 0") || js.includes("Math.max")
        passed = hasNegativeCheck
        message = passed ? "✅ Negative number prevention found" : "❌ No negative number prevention found"
        score = passed ? 12 : 0
      } else if (reqLower.includes("functional")) {
        const hasFunctionalComponent = js.includes("function") && !js.includes("class")
        passed = hasFunctionalComponent
        message = passed ? "✅ Functional component found" : "❌ Use functional components, not class components"
        score = passed ? 13 : 0
      }

      results.push({ requirement, passed, message, score })
    })

    return results
  }

  static validateReactTodoContext(doc: Document, css: string, js: string, requirements: string[]): ValidationResult[] {
    const results: ValidationResult[] = []

    requirements.forEach((requirement, index) => {
      let passed = false
      let message = ""
      let score = 0

      const reqLower = requirement.toLowerCase()

      if (reqLower.includes("context api")) {
        const hasContext = js.includes("createContext") && js.includes("useContext")
        passed = hasContext
        message = passed
          ? "✅ Context API implementation found"
          : "❌ Context API not implemented (createContext, useContext)"
        score = passed ? 13 : 0
      } else if (reqLower.includes("usereducer")) {
        const hasUseReducer = js.includes("useReducer")
        passed = hasUseReducer
        message = passed ? "✅ useReducer hook found" : "❌ useReducer hook not found"
        score = passed ? 12 : 0
      } else if (reqLower.includes("separate components")) {
        const hasComponents = js.includes("TodoList") && js.includes("TodoItem") && js.includes("AddTodo")
        passed = hasComponents
        message = passed
          ? "✅ Separate components found"
          : "❌ Missing separate components (TodoList, TodoItem, AddTodo)"
        score = passed ? 13 : 0
      } else if (reqLower.includes("add") && reqLower.includes("edit") && reqLower.includes("delete")) {
        const hasCRUD = js.includes("ADD_TODO") && js.includes("EDIT_TODO") && js.includes("DELETE_TODO")
        passed = hasCRUD
        message = passed ? "✅ CRUD operations found" : "❌ Missing CRUD operations (ADD_TODO, EDIT_TODO, DELETE_TODO)"
        score = passed ? 12 : 0
      } else if (reqLower.includes("filter")) {
        const hasFilter = js.includes("filter") && js.includes("SET_FILTER")
        passed = hasFilter
        message = passed ? "✅ Filter functionality found" : "❌ No filter functionality found"
        score = passed ? 13 : 0
      } else if (reqLower.includes("localstorage")) {
        const hasLocalStorage = js.includes("localStorage")
        passed = hasLocalStorage
        message = passed ? "✅ localStorage persistence found" : "❌ No localStorage persistence found"
        score = passed ? 12 : 0
      } else if (reqLower.includes("count")) {
        const hasCount = js.includes("count") || js.includes("length")
        passed = hasCount
        message = passed ? "✅ Todo count display found" : "❌ No todo count display found"
        score = passed ? 12 : 0
      } else if (reqLower.includes("error handling")) {
        const hasErrorHandling = js.includes("try") && js.includes("catch")
        passed = hasErrorHandling
        message = passed ? "✅ Error handling found" : "❌ No error handling found (use try-catch)"
        score = passed ? 13 : 0
      }

      results.push({ requirement, passed, message, score })
    })

    return results
  }

  static validateExpressAPI(doc: Document, css: string, js: string, requirements: string[]): ValidationResult[] {
    const results: ValidationResult[] = []

    requirements.forEach((requirement, index) => {
      let passed = false
      let message = ""
      let score = 0

      const reqLower = requirement.toLowerCase()

      if (reqLower.includes("registration") && reqLower.includes("login")) {
        const hasAuth = js.includes("/register") && js.includes("/login")
        passed = hasAuth
        message = passed ? "✅ Registration and login endpoints found" : "❌ Missing registration or login endpoints"
        score = passed ? 13 : 0
      } else if (reqLower.includes("jwt") && reqLower.includes("authentication")) {
        const hasJWT = js.includes("jwt") && js.includes("authenticateToken")
        passed = hasJWT
        message = passed ? "✅ JWT authentication middleware found" : "❌ JWT authentication middleware missing"
        score = passed ? 12 : 0
      } else if (reqLower.includes("crud")) {
        const hasCRUD = js.includes("GET") && js.includes("POST") && js.includes("PUT") && js.includes("DELETE")
        passed = hasCRUD
        message = passed ? "✅ CRUD operations found" : "❌ Missing CRUD operations (GET, POST, PUT, DELETE)"
        score = passed ? 13 : 0
      } else if (reqLower.includes("validation")) {
        const hasValidation = js.includes("validate") || js.includes("required")
        passed = hasValidation
        message = passed ? "✅ Input validation found" : "❌ No input validation found"
        score = passed ? 12 : 0
      } else if (reqLower.includes("error handling")) {
        const hasErrorHandling = js.includes("errorHandler") && js.includes("try") && js.includes("catch")
        passed = hasErrorHandling
        message = passed ? "✅ Error handling middleware found" : "❌ No error handling middleware found"
        score = passed ? 13 : 0
      } else if (reqLower.includes("rate limiting")) {
        const hasRateLimit = js.includes("rateLimit") || js.includes("express-rate-limit")
        passed = hasRateLimit
        message = passed ? "✅ Rate limiting found" : "❌ No rate limiting found"
        score = passed ? 12 : 0
      } else if (reqLower.includes("documentation")) {
        const hasDocumentation = js.includes("/**") || js.includes("* @")
        passed = hasDocumentation
        message = passed ? "✅ API documentation comments found" : "❌ No API documentation comments found"
        score = passed ? 12 : 0
      } else if (reqLower.includes("bcrypt") && reqLower.includes("password")) {
        const hasBcrypt = js.includes("bcrypt") && js.includes("hash")
        passed = hasBcrypt
        message = passed ? "✅ Password hashing with bcrypt found" : "❌ No password hashing with bcrypt found"
        score = passed ? 13 : 0
      }

      results.push({ requirement, passed, message, score })
    })

    return results
  }

  static validateMongoDB(doc: Document, css: string, js: string, requirements: string[]): ValidationResult[] {
    const results: ValidationResult[] = []

    requirements.forEach((requirement, index) => {
      let passed = false
      let message = ""
      let score = 0

      const reqLower = requirement.toLowerCase()

      if (reqLower.includes("mongoose") && reqLower.includes("schema")) {
        const hasSchema = js.includes("Schema") && js.includes("mongoose.model")
        passed = hasSchema
        message = passed ? "✅ Mongoose schemas found" : "❌ No Mongoose schemas found"
        score = passed ? 13 : 0
      } else if (reqLower.includes("crud")) {
        const hasCRUD = js.includes("create") && js.includes("find") && js.includes("update") && js.includes("delete")
        passed = hasCRUD
        message = passed ? "✅ CRUD operations found" : "❌ Missing CRUD operations"
        score = passed ? 12 : 0
      } else if (reqLower.includes("validation")) {
        const hasValidation = js.includes("required") && js.includes("validate")
        passed = hasValidation
        message = passed ? "✅ Data validation found" : "❌ No data validation found"
        score = passed ? 13 : 0
      } else if (reqLower.includes("population")) {
        const hasPopulation = js.includes("populate")
        passed = hasPopulation
        message = passed ? "✅ Population for related documents found" : "❌ No population found"
        score = passed ? 12 : 0
      } else if (reqLower.includes("pagination")) {
        const hasPagination = js.includes("skip") && js.includes("limit")
        passed = hasPagination
        message = passed ? "✅ Pagination implementation found" : "❌ No pagination found"
        score = passed ? 13 : 0
      } else if (reqLower.includes("indexing")) {
        const hasIndexing = js.includes("index")
        passed = hasIndexing
        message = passed ? "✅ Indexing found" : "❌ No indexing found"
        score = passed ? 12 : 0
      } else if (reqLower.includes("aggregation")) {
        const hasAggregation = js.includes("aggregate") && js.includes("$group")
        passed = hasAggregation
        message = passed ? "✅ Aggregation pipeline found" : "❌ No aggregation pipeline found"
        score = passed ? 12 : 0
      } else if (reqLower.includes("connection")) {
        const hasConnection = js.includes("mongoose.connect") && js.includes("connectDB")
        passed = hasConnection
        message = passed ? "✅ Proper connection handling found" : "❌ No proper connection handling found"
        score = passed ? 13 : 0
      }

      results.push({ requirement, passed, message, score })
    })

    return results
  }

  static validate(
    problemId: number,
    doc: Document,
    css: string,
    js: string,
    requirements: string[],
  ): ValidationResult[] {
    switch (problemId) {
      case 1: // Navigation Bar
        return this.validateNavigation(doc, css, js, requirements)
      case 2: // Todo App
        return this.validateTodoApp(doc, css, js, requirements)
      case 3: // React Counter
        return this.validateReactCounter(doc, css, js, requirements)
      case 4: // React Todo with Context
        return this.validateReactTodoContext(doc, css, js, requirements)
      case 5: // Express API
        return this.validateExpressAPI(doc, css, js, requirements)
      case 6: // MongoDB CRUD
        return this.validateMongoDB(doc, css, js, requirements)
      default:
        // Generic validation for other problems
        return requirements.map((requirement, index) => ({
          requirement,
          passed: Math.random() > 0.4, // Random for demo
          message: "Generic validation - implement specific checks for this problem type",
          score: Math.random() > 0.4 ? 15 : 0,
        }))
    }
  }
}
