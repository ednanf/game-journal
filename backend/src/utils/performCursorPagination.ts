import { Model, Types } from 'mongoose';

// This function will handle paginating our journal entries
const performCursorPagination = async (
  model: Model<any>,
  limit: number,
  cursor?: string,
  query: object = {},
) => {
  let findQuery: object = query;

  // if there is a cursor, change the query
  if (cursor) {
    const [timestamp, id] = cursor.split('_');
    const cursorDate = new Date(parseInt(timestamp, 10));

    // build a more complex query to find items after the cursor
    findQuery = {
      ...query,
      $or: [{ createdAt: { $lt: cursorDate } }, { createdAt: cursorDate, _id: { $lt: id } }],
    };
  }

  // Fetch one extra item to see if there's a next page
  const queryLimit = limit + 1;

  // Now, run the query against the database.
  const documents = await model.find(findQuery).sort({ createdAt: -1, _id: -1 }).limit(queryLimit);

  let hasNextPage = false;
  if (documents.length > limit) {
    hasNextPage = true;
  }

  // The actual documents sent back should not include the extra one
  const pageDocuments = documents.slice(0, limit);

  let nextCursor = null;
  // If there was an extra document, we know there's a next page,
  // so we can create the next cursor from the last item currently displayed in the page.
  if (hasNextPage) {
    const lastDoc = pageDocuments[pageDocuments.length - 1];
    if (lastDoc) {
      // create the cursor string from the last document's data
      // eslint-disable-next-line no-underscore-dangle
      const docId = (lastDoc._id as Types.ObjectId).toString();
      const createdAt = lastDoc.createdAt as Date;
      nextCursor = `${createdAt.getTime()}_${docId}`;
    }
  }

  // return the results
  return { documents: pageDocuments, nextCursor };
};

export default performCursorPagination;
