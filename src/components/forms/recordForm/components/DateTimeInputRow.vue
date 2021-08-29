<template>
	<div class="row">
		<div class="col-12">
			<flat-pickr
				v-model="date"
				:config="config"
				class="
					mdl-border mdl-shadow
					form-control
					p-3
					bg-body
					rounded
					mt-3
				"
			></flat-pickr>
		</div>
	</div>
</template>

<script>
export default {
	name: "DateTimeInputRow",

	data() {
		return {
			date: new Date(new Date().getTime() + 10 * 60000),

			config: {
				wrap: true,
				onopen: function () {
					const minDate = new Date(new Date().getTime() + 10 * 60000);
					this.set("minDate", minDate);
					if (this.date < minDate) {
						this.setDate(minDate);
					}
				},
				enableTime: true,
				altInput: true,
				altFormat: "F j, Y  h:iK",
				dateFormat: "Y-m-dTH:i:00",
				time_24hr: false,
				minDate: new Date(new Date().getTime() + 10 * 60000),
			},
		};
	},
	computed: {
		/* date: function () {
			if (this.$store.state.auth.otpState.twilio_status === "verified") {
				return new Date(new Date().getTime() + 5 * 60000);
			} else {
				return new Date(new Date().getTime() + 10 * 60000);
			}
		}, */

		startDate: function () {
			return this.date.toISOString.split("T")[0];
		},

		startTime: function () {
			return this.date.toISOString.split("T")[1].splice(0, -1);
		},

		timezone: function () {
			if (this.$store.state.auth.user.timezone) {
				return this.$store.state.auth.user.timezone;
			} else return "UTC";
		},
	},
	watch: {
		date: function (newDate) {
			console.log("Date selected", new Date(newDate).toISOString());
			this.$store.dispatch("data/setPreferredDate", new Date(newDate));
		},
	},
	mounted() {
		console.log("Date selected", new Date(this.date).toISOString());
		this.$store.dispatch("data/setPreferredDate", new Date(this.date));
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