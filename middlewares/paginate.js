module.exports.paginatedResults = (model) => async (req, res, next) => {
  try {
    // const gigs = await models["Gig"].findAll();
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    // res.json({ page, limit });
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    // res.json({ startIndex, endIndex });
    const results = {};
    const queryResult = await model.findAndCountAll({
      offset: startIndex,
      limit: limit,
    });
    // res.json(gigs);
    results.results = queryResult;
    if (endIndex < queryResult.count) {
      results.next = {
        page: page + 1,
        limit: limit,
      };
    }
    if (startIndex > 0) {
      results.prev = {
        page: page - 1,
        limit: limit,
      };
    }
    res.paginatedResults = results;
    next();
  } catch (err) {
    console.log(err);
  }
};

// module.exports = {
//   paginatedResults,
// };
