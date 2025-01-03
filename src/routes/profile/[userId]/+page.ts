export const load = async ({ params, parent }) => {
    const { rootLayoutPresenter } = await parent()
    if (!params.userId || params.userId !== rootLayoutPresenter.user?.id) {
        throw new Error("Not implemented yet: you cannot view other users' profiles")
    }

    return {
        user: rootLayoutPresenter.user,
    }
}