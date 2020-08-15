const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let ChatGroupSchema = new Schema({
  name: String,
  userAmount: { type: Number, min: 3, max: 999 },
  messageAmount: { type: Number, default: 0 },
  userId: String,
  members: [{ userId: String }],
  createdAt: { type: Number, default: Date.now },
  updatedAt: { type: Number, default: Date.now },
  deletedAt: { type: Number, default: null },
});

ChatGroupSchema.statics = {
  createNew(item) {
    return this.create(item);
  },

  /**
   * get chat group by userID and limit
   * @param {string} userId
   * @param {number} limit
   */
  getChatGroups(userId, limit) {
    //$elemMatch truy van mang trong mongoesDB
    return this.find({ members: { $elemMatch: { userId: userId } } })
      .sort({ updatedAt: -1 }) // sap xeo tu cao xuong thap cao la thang thoi gian gan nhat
      .limit(limit)
      .exec();
  },
  getChatGroupById(id) {
    //$elemMatch truy van mang trong mongoesDB
    return this.findById(id).exec();
  },
  /**
   * Update groups chat when have new message
   * @param {string} id
   * @param {number} newMessageAmount
   */
  updateWhenAddNewMessage(id, newMessageAmount) {
    return this.findByIdAndUpdate(id, {
      messageAmount: newMessageAmount,
      updatedAt: Date.now(),
    }).exec();
  },

  getChatGroupIdsByUser(userId) {
    return this.find(
      { members: { $elemMatch: { userId: userId } } },
      { _id: 1 },
    ).exec();
  },
  readMoreChatGroup(userId, skip, limit) {
    //$elemMatch truy van mang trong mongoesDB
    return this.find({ members: { $elemMatch: { userId: userId } } })
      .sort({ updatedAt: -1 }) // sap xeo tu cao xuong thap cao la thang thoi gian gan nhat
      .skip(skip)
      .limit(limit)
      .exec();
  },
};

module.exports = mongoose.model("chat-group", ChatGroupSchema);