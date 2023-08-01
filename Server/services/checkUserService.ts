import { UserModel } from "../Models/Store";

// check if email or idNumber already exists in database
export const checkExistingUser = async (email: string, idNumber: number) => {
  const existingIdNumber = await UserModel.findOne({ idNumber: idNumber });
  const existingEmail = await UserModel.findOne({ email: email });

  return {
    emailExists: !!existingEmail,
    idExists: !!existingIdNumber,
  };
};
