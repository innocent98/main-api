import User from "../models/User";

const findFreelancerService = async (
  query: any,
  page: string,
  pageSize: number
) => {
  const completeQuery = { ...query, userRole: "freelancer" };

  const freelancers = await User.find(completeQuery)
    .sort({ createdAt: -1 })
    .select({
      email: 0,
      password: 0,
      userRole: 0,
      isEmailVerified: 0,
      resetCode: 0,
      resetCodeExpIn: 0,
      gender: 0,
      companyLogo: 0,
      companyName: 0,
      companyDesc: 0,
      companyInterests: 0,
      companyLinks: 0,
      phone: 0,
      zip: 0,
      cryptoBalance: 0,
      availableBalance: 0,
      walletAddress: 0,
      walletAddressNetwork: 0,
      bankName: 0,
      accountNumber: 0,
    })
    .skip((parseInt(page) - 1) * pageSize)
    .limit(pageSize)
    .exec();

  return freelancers;
};

export { findFreelancerService };
