// This file re-exports authOptions from a centralized location
import { authOptions as authOptionsImport } from "../app/api/auth/[...nextauth]/auth-options";

export const authOptions = authOptionsImport;
