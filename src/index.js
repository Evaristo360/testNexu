const { Barcode, BarcodeSchema } = require('./barcodes.model');
const { User, UserSchema } = require('./users.model');
const { History, HistorySchema } = require('./history.model');
const { Gifts, GiftsSchema } = require('./gifts.model');
const { GiftsDaily, GiftsDailySchema } = require('./giftsDaily.model');
const { Product, ProductSchema } = require('./products.model');
const { RedeemGift, RedeemGiftSchema } = require('./redeemGifts.model');

const setupModels = (sequelize) => {
  User.init(UserSchema, User.config(sequelize));
  Barcode.init(BarcodeSchema, Barcode.config(sequelize));
  History.init(HistorySchema, History.config(sequelize));
  Gifts.init(GiftsSchema, Gifts.config(sequelize));
  GiftsDaily.init(GiftsDailySchema, GiftsDaily.config(sequelize));
  Product.init(ProductSchema, Product.config(sequelize));
  RedeemGift.init(RedeemGiftSchema, RedeemGift.config(sequelize));
}
module.exports = setupModels;