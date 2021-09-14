<template>
	<!-- Button trigger modal -->
	<button
		type="button"
		class="btn btn-primary"
		data-bs-toggle="modal"
		data-bs-target="#orderModal"
	>
		Launch demo modal
	</button>

	<!-- Modal starts -->
	<div
		class="modal fade"
		id="orderModal"
		tabindex="-1"
		aria-labelledby="orderModalLabel"
		aria-hidden="true"
	>
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="orderModalLabel">
						Modal title
					</h5>
					<button
						type="button"
						class="btn-close"
						data-bs-dismiss="modal"
						aria-label="Close"
					></button>
				</div>
				<div class="modal-body">
					By clicking <b>yes</b> you are agreeing to our
					<a href="https://manydial.com/privacy-policy/"
						>Privacy Policy</a
					>
					and
					<a href="https://manydial.com/terms-and-conditions/"
						>Terms & Conditions</a
					>.
				</div>
				<div class="modal-footer">
					<button
						type="button"
						class="btn btn-secondary"
						data-bs-dismiss="modal"
					>
						No
					</button>
					<button
						type="button"
						class="btn btn-primary"
						@click="onNextBtn"
					>
						Yes
					</button>
				</div>
			</div>
		</div>
	</div>
	<!-- Modal ends -->
</template>

<script>
export default {
	name: "OrderModal",
};
</script>

<style>
</style>