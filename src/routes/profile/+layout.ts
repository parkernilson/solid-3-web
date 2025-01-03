import { redirect } from "@sveltejs/kit"

export const load = async ({ parent }) => {
    const { rootLayoutPresenter } = await parent()
    if (!rootLayoutPresenter.user) {
        throw redirect(302, '/login')
    }
    return {
        rootLayoutPresenter
    }
}