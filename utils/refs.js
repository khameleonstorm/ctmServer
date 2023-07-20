const cron = require('node-cron');
const { Trade } = require('../models/trade');
const { Deposit } = require('../models/transaction');
const { User } = require('../models/user');

// Define the cron job logic
const runCronJob = (io) => {
  // const job = 
  cron.schedule('0 * * * *', async () => {
    try {
      // Get all users and iterate through them
      const users = await User.find();

      const updatePromises = [];

      // Iterate through the users and handle referrals
      for (const user of users) {
        const referredUsers = await User.find({ referredBy: user.username });

        for (const referredUser of referredUsers) {
          // Calculate the total trade amount from referred user's trade history
          const referredUserTradeHistory = await Trade.find({ email: referredUser.email });
          const totalTradeAmount = referredUserTradeHistory.reduce((total, trade) => {
            return total + (trade.spread + trade.amount);
          }, 0);


          // check if total deposits is greater than or equal to 10
          const totalDeposits = await Deposit.find({ from: referredUser.email });
          const totalDepositAmount = totalDeposits.reduce((total, deposit) => {
            return total + (deposit.amount);
          }, 0);


          // Check if total trade amount is greater than or equal to 100
          if (totalTradeAmount >= 100 && totalDepositAmount > 10 && !referredUser.referredBy.includes('claimed') && !referredUser.referredBy.includes('redeemed') && user.bonus >= 0.5) {
            // Subtract 10 from referrer's bonus balance and add it to the main balance
            user.bonus -= 0.5;
            user.balance += 0.5;

            referredUser.referredBy = `${referredUser.referredBy} redeemed`;
            updatePromises.push(referredUser.save());

            updatePromises.push(user.save());
          }
        }
      }

      // Save all the updated trades and users together
      await Promise.all(updatePromises);

      io.emit('tradeProgressUpdated');
      console.log('Cron job executed successfully.');

      // job.stop();
    } catch (error) {
      console.error('Error executing cron job:', error);
    }
  });
};



// Export the function to run the cron job
module.exports = runCronJob;



