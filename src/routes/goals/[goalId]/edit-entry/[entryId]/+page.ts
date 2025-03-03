export const load = async ({ params, parent }) => {
    await parent();
    const entryId = params.entryId;
    return { entryId };
}