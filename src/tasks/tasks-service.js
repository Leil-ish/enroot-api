const xss = require('xss')

const TasksService = {

  getAllTasks(db) {
    return db
    .from('enroot_tasks AS enroot_task')
    .select(
      'enroot_task.id',
      'enroot_task.plant_id',
      'enroot_task.plant_common_name',
      'enroot_task.user_id',
      'enroot_task.maintenance_needed',
      'enroot_task.frequency',
      'enroot_task.modified',
      'enroot_task.details',
    )
    .groupBy('enroot_task.id')
  },

  getTaskById(db, id) {
    return db
    .from('enroot_tasks AS enroot_task')
    .select(
      'enroot_task.id',
      'enroot_task.plant_id',
      'enroot_task.plant_common_name',
      'enroot_task.user_id',
      'enroot_task.maintenance_needed',
      'enroot_task.frequency',
      'enroot_task.modified',
      'enroot_task.details',
    )
    .where('enroot_task.id', id)
  },

  serializeTask(task) {
    return {
      id: task.id,
      plant_id: task.plant_id,
      plant_common_name: xss(task.plant_common_name),
      user_id: task.user_id,
      maintenance_needed: xss(task.maintenance_needed),
      frequency: task.frequency,
      details: xss(task.details),
      modified: new Date(task.modified),
    }
  }
}

module.exports = TasksService