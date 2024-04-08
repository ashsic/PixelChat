// Chat resolvers
function _id(parent) {
  return parent.id ?? parent._id;
};

export default {
  _id,
};
