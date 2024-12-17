<script lang="ts">
	import { presenterFactory } from "$lib/factories";
	import type { Dialog } from "$lib/presenters/DialogPresenter.svelte";

    const dialogPresenter = presenterFactory.getDialogPresenterInstance();
    const dialog: Dialog = {
        content: {
            title: "Title",
            body: "Body"
        },
        actions: {
            accept: {
                label: "Accept",
                handle: () => ({ action: 'accept' })
            },
            cancel: {
                label: "Cancel",
                handle: () => ({ action: 'cancel' })
            }
        }
    }

    const showTestDialog = async () => {
        try {
            const result = await dialogPresenter.showDialog(dialog);
            console.log(result);
        } catch(e) {
            console.error(e);
        }
    }
</script>

<button onclick={showTestDialog}>Show Dialog</button>