const cron = require('node-cron');
const { Trade } = require('../models/trade');
const { User } = require('../models/user');

// Define the cron job logic
const runCronJob = (io) => {
  cron.schedule('* * * * *', async () => {
    try {
      // Find pending trades
      const pendingTrades = await Trade.find({ status: 'pending' });
      console.log('Pending trades:', pendingTrades)

      const updatePromises = [];

      // Loop through the pending trades and update progress
      for (const trade of pendingTrades) {
        // Increment progress by 1
        trade.progress += 1;

        // If progress reaches 1440, update status to completed
        if (trade.progress >= 1440) {
          trade.status = 'completed';

          // Find the user who placed the trade
          const user = await User.findOne({ email: trade.email });

          // Update the user's trade balance by adding the spread
          user.trade += trade.spread;

          // Push the updated user and trade to the update promises array
          updatePromises.push(user.save());
        }

        // Push the updated trade to the update promises array
        updatePromises.push(trade.save());
      }

      // Save all the updated trades and users together
      await Promise.all(updatePromises);

      io.emit('tradeProgressUpdated');
      console.log('Cron job executed successfully.');
    } catch (error) {
      console.error('Error executing cron job:', error);
    }
  });
};

// Export the function to run the cron job
module.exports = runCronJob;
