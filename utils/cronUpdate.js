const cron = require('node-cron');
const { Trade } = require('../models/trade');
const { User } = require('../models/user');

// Define the cron job logic
const runCronJob = (io) => {
  // const job = 
  cron.schedule('* * * * *', async () => {
    try {
      // Find pending trades
      const pendingTrades = await Trade.find({ status: 'pending' });

      const updatePromises = [];

      // Loop through the pending trades and update progress
      for (const trade of pendingTrades) {
        // Increment progress by 1
        trade.progress += 1;

        // If progress reaches 1440 or trade more than 24 hours, update status to completed
        if (trade.progress >= 1440) {
          trade.status = 'completed';

          // Find the user who placed the trade
          const user = await User.findOne({ email: trade.email });

          // Update the user's trade balance by adding the spread and the amount
          const tradeAmount = Number(trade.spread) + Number(trade.amount)
          user.trade += tradeAmount;

          updatePromises.push(user.save());
        }

        updatePromises.push(trade.save());
      }

      // Save all the updated trades and users together
      await Promise.all(updatePromises);

      io.emit('tradeProgressUpdated');
      console.log('Cron job executed.');

      // job.stop();
    } catch (error) {
      console.error('Error executing cron job:', error);
    }
  });
};



// Export the function to run the cron job
module.exports = runCronJob;