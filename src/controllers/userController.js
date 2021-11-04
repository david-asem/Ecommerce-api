//bunch of functions

const sign_up = async (req,res,next) => {
  return res.status(200).json({
    success:'it works',
  })
}

module.exports = {
sign_up,
};