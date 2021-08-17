<template>
	<div class="row pt-3">
		<div class="col-8">
			<textarea
				class="mdl-border mdl-shadow form-control"
				:class="{
					'invalid-recipients': !isNumbersValid,
					'valid-recipients': isNumbersValid,
				}"
				type="number"
				id="recipient-numbers"
				rows="3"
				placeholder="Enter or Upload Recipient numbers. eg.
+15417543010
+447911123456"
				v-model="recipientNumber"
			></textarea>
		</div>

		<div class="col-4">
			<!-- Record button starts -->
			<div class="btn-group">
				<button
					type="button"
					class="
						btn btn-outline-primary
						py-3 py-xs-0
						my-xs-0
						dropdown-toggle
					"
					data-bs-toggle="dropdown"
					aria-expanded="false"
				>
					Input
				</button>
				<ul class="dropdown-menu">
					<!-- <li>
						<a class="dropdown-item" href="#"
							><font-awesome-icon
								:icon="['fas', 'keyboard']"
								:style="{ color: '616161' }"
							/><span> Enter Numbers</span></a
						>
					</li> -->
					<li>
						<a class="dropdown-item" href="#"
							><font-awesome-icon
								:icon="['fas', 'download']"
								:style="{ color: '388E3C' }"
							/><span> Download Numbers </span></a
						>
					</li>
					<li>
						<hr class="dropdown-divider" />
					</li>
					<li>
						<a class="dropdown-item" href="#"
							><font-awesome-icon
								:icon="['fas', 'upload']"
								:style="{ color: '0288D1' }"
							/><span> Upload Numbers</span></a
						>
					</li>
				</ul>
			</div>
		</div>
	</div>

	<div class="row pt-3">
		<div class="col-8">
			<p id="disclaimer-text">
				* To upload numbers, make sure the numbers are in a single
				column with the country code. Currently we only support
				excel/csv or txt files.
			</p>
		</div>
	</div>
</template>

<script>
export default {
	name: "RecipientNumberRow",
	data() {
		return {
			recipientNumber: "",
			tokenizedNumbers: [],
		};
	},
	watch: {
		recipientNumber(newString) {
			this.tokenizedNumbers = newString.split(/\r?\n/);
			if (this.isNumbersValid) {
				this.$store.state.data.recipients = this.tokenizedNumbers;
				console.log(this.$store.state.data.recipients);
			} else {
				this.$store.state.data.recipients = null;
			}
		},
	},
	computed: {
		isNumbersValid() {
			if (this.recipientNumber.length === 0) {
				return false;
			}
			return this.tokenizedNumbers.every((number) => {
				return number.match("^(\\+88)?01[3-9]{1}[0-9]{8}$");
			});
		},
	},
};
</script>

<style scoped>
@media (max-width: 1400px) {
	.btn {
		padding-left: 0px;
		padding-right: 0px;
	}
}

.btn-group {
	width: 100%;
}

#disclaimer-text {
	font-size: 0.5em; /* 14px/16=0.875em */
	line-height: normal;
	text-align: justify;
}

.invalid-recipients:focus {
	box-shadow: 0 0 0 0.25rem rgb(239 83 80 / 50%) !important;
}

.valid-recipients:focus {
	box-shadow: 0 0 0 0.25rem rgb(102 187 106 / 50%) !important;
}
</style>