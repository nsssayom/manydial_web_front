<template>
	<footer id="footer">
		<div class="container text-center">
			<h3>Welcome to Manydial</h3>
			<div class="row text-center topmargin-lg">
				<div class="col-md-4 divider-right">
					<div class="footer-btn">
						<h6>Corporate Office</h6>

						<p>
							<a
								id="office-loc-link"
								target="_blank"
								href="https://g.page/hellotaskapp"
							>
								160 Robinson Road, Singapore
							</a>
						</p>
					</div>
				</div>
				<div class="col-md-4 divider-right">
					<div class="footer-btn">
						<h6>Email</h6>

						<p>
							<a
								id="mail-link"
								target="_blank"
								href="mailto:info@manydial.com"
							>
								info@manydial.com</a
							>
						</p>
					</div>
				</div>
				<div class="col-md-4">
					<div class="footer-btn">
						<h6>Call center</h6>
						<p>
							<a id="tel-link" href="tel:097777777777">
								097777777777
							</a>
						</p>
					</div>
				</div>
			</div>
		</div>
	</footer>
</template>

<script>
export default {
	name: "Footer",
};
</script>

<style scoped>
#office-loc-link,
#mail-link,
#tel-link {
	text-decoration: none;
}
</style>