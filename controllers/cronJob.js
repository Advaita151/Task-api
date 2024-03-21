import { schedule } from 'node-cron';
import { find } from './models/task';

schedule('0 0 * * *', async () => {
  try {
    const tasksToday = await find({ due_date: { $lte: new Date(), $gte: new Date(new Date().setHours(0, 0, 0, 0)) } }).exec();

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dayAfterTomorrow = new Date();
    dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2);
    const tasksTomorrow = await find({ due_date: { $gte: tomorrow, $lte: dayAfterTomorrow } }).exec();

    const threeDaysLater = new Date();
    threeDaysLater.setDate(threeDaysLater.getDate() + 3);
    const fourDaysLater = new Date();
    fourDaysLater.setDate(fourDaysLater.getDate() + 4);
    const tasksThreeToFourDaysLater = await find({ due_date: { $gte: threeDaysLater, $lte: fourDaysLater } }).exec();

    const tasksFivePlusDaysLater = await find({ due_date: { $gt: fourDaysLater } }).exec();

    tasksToday.forEach(task => {
      task.priority = 0;
      task.save();
    });

    tasksTomorrow.forEach(task => {
      task.priority = 1;
      task.save();
    });

    tasksThreeToFourDaysLater.forEach(task => {
      task.priority = 2;
      task.save();
    });

    tasksFivePlusDaysLater.forEach(task => {
      task.priority = 3;
      task.save();
    });

    console.log('Task priorities updated successfully.');
  } catch (error) {
    console.error('Error updating task priorities:', error);
  }
});
