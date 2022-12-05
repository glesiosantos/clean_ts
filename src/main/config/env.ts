export default {
  mongoUrl: process.env.MONGO_URL || 'mongodb://mongo:27017/clean_node_api_db',
  port: 3000,
  jwtSecret: process.env.JWT_SECRET || 'clean$a1vhk07#7n47%h9+9(t#2(wnx8+@1yr8(^1d_0ic)ir!x@q%gts'
}
