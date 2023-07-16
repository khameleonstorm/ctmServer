const cron = require('node-cron');
const { Trade } = require('../models/trade');
const { User } = require('../models/user');

// Define the cron job logic
const runCronJob = (io) => {
  cron.schedule('0 * * * *', async () => {
    try {
      // Find pending trades Loop through n update
      const pendingTrades = await Trade.find({ status: 'pending' })

      for (const trade of pendingTrades) {
        // Increment progress by 1
        trade.progress += 1;

        // If progress reaches 24 hours Find n update user's trade balance
        if (trade.progress = 24) {
          trade.status = 'completed';
          const tradeAmt = trade.amount + trade.spread;
          await User.findOneAndUpdate({ email: trade.email }, {$inc: {trade: tradeAmt}})
        }
        await trade.save();
      }
      io.emit('tradeProgressUpdated');
      console.log('Cron job executed.');
    } catch (error) {
      console.error('Error executing cron job:', error);
    }
  });
};



// Export the function to run the cron job
module.exports = runCronJob;