<template>
	<div class="row pt-3">
		<div class="col-12">
			<div class="accordion" id="dateAccordion">
				<div class="accordion-item mdl-border mdl-shadow">
					<h2 class="accordion-header" id="headingOne">
						<button
							class="accordion-button collapsed text-muted"
							type="button"
							data-bs-toggle="collapse"
							data-bs-target="#collapseOne"
							aria-expanded="false"
							aria-controls="collapseOne"
						>
							{{
								dateSelected
									? dateSelected.toLocaleString("en-US")
									: "Select the Date and Time to Initiate Call"
							}}
						</button>
					</h2>
					<div
						id="collapseOne"
						class="accordion-collapse collapse"
						aria-labelledby="headingOne"
						data-bs-parent="#dateAccordion"
					>
						<div class="accordion-body">
							<v-date-picker
								is-expanded
								v-model="date"
								mode="dateTime"
								:locale="{
									id: 'en',
									firstDayOfWeek: 1,
									masks: { weekdays: 'WWW' },
								}"
								:min-date="
									new Date(new Date().getTime() + 15 * 60000)
								"
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "DateTimeInputRow",
	data() {
		return {
			date: new Date(),
			/* timezone: "+06:00", */
			/* masks: {
				input: "YYYY-MM-DD hh:MM:SS",
			}, */
		};
	},
	computed: {
		dateSelected: function () {
			return this.$store.state.data.preferredDate;
		},
	},
	watch: {
		date: function (newDate) {
			// console.log("date changed", newDate.toISOString());
			this.$store.state.data.preferredDate = newDate;
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
</style>