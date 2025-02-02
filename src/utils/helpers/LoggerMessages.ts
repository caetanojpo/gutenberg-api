export abstract class LoggerMessages {
  private constructor() {}

  // Server related messages
  public static readonly SERVER_LISTENING = "Server is listening on port {}";
  public static readonly GRACEFUL_SHUTDOWN = "Graceful Shutdown initiated...";
  public static readonly SERVER_STOPPED = "Server stopped gracefully.";

  // Database related messages
  public static readonly DB_CONNECTING = "Connecting to the database...";
  public static readonly DB_CONNECTED =
    "Database connection established successfully.";
  public static readonly DB_CONNECTION_ERROR = "Database connection error: {}";
  public static readonly DB_DISCONNECTING =
    "Disconnecting from the database...";
  public static readonly DB_DISCONNECTED =
    "Database disconnected successfully.";
  public static readonly DB_DISCONNECTED_ERROR =
    "Database disconnected error: {}";

  // API request messages
  public static readonly REQUEST_RECEIVED = "Received {} request to {}";
  public static readonly SUCCESSFUL_REQUEST =
    "Successful request with status {}: {}";
  public static readonly ERROR_OCCURED = "An error occurred with status {}: {}";
  public static readonly ROUTE_NOT_FOUND = "Route {} not found.";
  public static readonly VALIDATION_ERROR = "Validation error: {}";
  public static readonly INVALID_REQUEST = "Invalid request received";
  public static readonly UNAUTHORIZED_ACCESS =
    "Unauthorized access attempt detected";
  public static readonly INTERNAL_SERVER_ERROR =
    "Internal server error occurred";
  public static readonly ENTITY_CONFLICT = "Entity already exists conflict: {}";

  // Error handling messages
  public static readonly UNHANDLED_REJECTION =
    "Unhandled Rejection at: {}, reason: {}";
  public static readonly UNCAUGHT_EXCEPTION = "Uncaught Exception: {}";

  // User Mapping
  public static readonly MAPPING_IUSER_TO_USER_SCHEMA =
    "Mapping IUser to UserSchema for username: {}";
  public static readonly MAPPING_USER_SCHEMA_TO_IUSER =
    "Mapping UserSchema to IUser for username: {}";
  public static readonly MAPPING_CREATE_USER_DTO_TO_IUSER =
    "Mapping CreateUserDTO to IUser for username: {}";
  public static readonly MAPPING_UPDATE_USER_DTO_TO_IUSER =
    "Mapping UpdateUserDTO to IUser for username: {}";
  public static readonly MAPPING_IUSER_TO_GET_USER_DTO =
    "Mapping IUser to GetUserDTO for user: {}";
  public static readonly MAPPING_TO_LOGIN_RESPONSE_DTO =
    "Mapping LoginResponseDTO for user ID: {}";
  public static readonly USER_MAPPED = "User mapped successfully";

  // Authentication
  public static readonly LOGIN_ATTEMPT = "User attempting to log in: {}";
  public static readonly LOGIN_SUCCESS = "User logged in successfully: {}";
  public static readonly LOGIN_FAILED = "Failed login attempt for email: {}";
  public static readonly TOKEN_GENERATION = "Generating token for user: {}";
  public static readonly TOKEN_GENERATED = "Token successfully generated: {}";
  public static readonly TOKEN_VERIFICATION = "Verifying token: {}";
  public static readonly TOKEN_INVALID = "Unauthorized: Invalid token detected";
  public static readonly NO_TOKEN = "Unauthorized: No token provided";
  public static readonly TOKEN_EXPIRED = "Unauthorized: Token has expired";

  // Password Operations
  public static readonly CHECKING_PASSWORD = "Checking password for user: {}";
  public static readonly PASSWORD_MATCH = "Password matches for user: {}";
  public static readonly PASSWORD_NOT_MATCH =
    "Password does not match for user: {}";
  public static readonly HASHING_PASSWORD = "Hashing password";
  public static readonly HASHED_PASSWORD = "Password hashed";

  // User Operations (MongoUserRepository)
  public static readonly FINDING_USER_BY_ID = "Finding user by id: {}";
  public static readonly USER_NOT_FOUND_BY_ID = "User not found with id: {}";
  public static readonly USER_FOUND_BY_ID = "User found with id: {}";
  public static readonly FINDING_USER_BY_EMAIL = "Finding user by email: {}";
  public static readonly USER_NOT_FOUND_BY_EMAIL =
    "User not found with email: {}";
  public static readonly USER_FOUND_BY_EMAIL = "User found with email: {}";
  public static readonly SAVING_USER =
    "Saving user to the database with email: {}";
  public static readonly USER_SAVED = "User saved successfully: {}";
  public static readonly UPDATING_USER = "Updating user with id: {}";
  public static readonly USER_UPDATED = "User updated successfully with id: {}";
  public static readonly DELETING_USER = "Deleting user with id: {}";
  public static readonly USER_DELETED = "User deleted successfully with id: {}";

  // Database Error Messages (MongoUserRepository)
  public static readonly DB_ERROR_FINDING_USER =
    "Error finding user in MongoDB: {}";
  public static readonly DB_ERROR_SAVING_USER =
    "Error saving user to MongoDB: {}";
  public static readonly DB_ERROR_UPDATING_USER =
    "Error updating user in MongoDB: {}";
  public static readonly DB_ERROR_DELETING_USER =
    "Error deleting user from MongoDB: {}";
  public static readonly ENTITY_NOT_FOUND =
    "Entity not found in MongoDB: {} with id: {}";

  // User Controller
  public static readonly START_USER_CREATION =
    "Starting user creation with email: {}";
  public static readonly START_USER_FIND_BY_ID = "Starting user find by id: {}";
  public static readonly START_USER_FIND_BY_EMAIL =
    "Starting user find by email: {}";
  public static readonly START_USER_UPDATE = "Starting user update with id: {}";
  public static readonly START_USER_SOFT_DELETE =
    "Starting user soft delete with id: {}";
  public static readonly START_USER_HARD_DELETE =
    "Starting user hard delete with id: {}";
}
