import mongoose from "mongoose";
import { compare, hash } from "bcrypt";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  level: {
    type: String,
    enum: ["user", "admin", "IT"],
    default: "user"
  },
  username: {
    type: String,
    unique: true,
    sparse: true
  },
  emailVerified: {
    type: Date,
    default: null
  },
  preferences: {
    theme: {
      type: String,
      default: ""
    },
    lastAgeFilter: {
      type: String,
      default: ""
    },
    lastStatusFilter: {
      type: String,
      default: ""
    }
  },
  notifications: {
    unread: [{
      message: String,
      timestamp: {
        type: Date,
        default: Date.now
      },
      link: String
    }],
    read: [{
      message: String,
      timestamp: Date,
      link: String
    }]
  },
  streak: {
    active: {
      type: Boolean,
      default: false
    },
    streak: {
      type: Number,
      default: 0
    },
    lastDate: {
      type: String,
      default: ""
    },
    longestStreak: {
      type: Number,
      default: 0
    },
    longestStreakDate: {
      type: String,
      default: ""
    }
  }
});

// Hash password before saving
UserSchema.pre("save", async function(next) {
  // Only hash the password if it's modified or new
  if (!this.isModified("password")) return next();

  // Don't hash passwords that are just numbers (for dev/testing purposes)
  if (!/^\d+$/.test(this.password)) {
    try {
      this.password = await hash(this.password, 10);
      next();
    } catch (error) {
      next(error);
    }
  } else {
    next();
  }
});

// Method to check password
UserSchema.methods.comparePassword = async function(candidatePassword) {
  // For numeric passwords (dev/testing)
  if (/^\d+$/.test(this.password)) {
    return candidatePassword === this.password;
  }

  // For hashed passwords
  return compare(candidatePassword, this.password);
};

// Use model if it exists, otherwise create it
export const User = mongoose.models.User || mongoose.model("User", UserSchema);
