<template>
	<div class="row">
		<div class="col-8 me-auto">
			<div
				method="get"
				class="digit-group"
				data-group-name="digits"
				data-autosubmit="false"
				autocomplete="off"
				maxLength="1"
			>
				<div class="input-group">
					<input
						type="number"
						id="digit-1"
						class="
							form-control
							shadow
							p-3
							bg-white
							rounded
							text-center
						"
						name="digit-1"
						data-next="digit-2"
						maxlength="1"
						v-model="digit_1"
					/>
					<input
						type="number"
						id="digit-2"
						class="
							form-control
							shadow
							p-3
							bg-white
							rounded
							text-center
						"
						name="digit-2"
						data-next="digit-3"
						data-previous="digit-1"
						maxlength="1"
						v-model="digit_2"
					/>
					<input
						type="number"
						id="digit-3"
						class="
							form-control
							shadow
							p-3
							bg-white
							rounded
							text-center
						"
						name="digit-3"
						data-next="digit-4"
						data-previous="digit-2"
						maxlength="1"
						v-model="digit_3"
					/>
					<input
						type="number"
						id="digit-4"
						class="
							form-control
							shadow
							p-3
							bg-white
							rounded
							text-center
						"
						name="digit-4"
						data-next="digit-5"
						data-previous="digit-3"
						maxlength="1"
						v-model="digit_4"
					/>
					<input
						type="number"
						id="digit-5"
						class="
							form-control
							shadow
							p-3
							bg-white
							rounded
							text-center
						"
						name="digit-5"
						data-next="digit-6"
						data-previous="digit-4"
						maxlength="1"
						v-model="digit_5"
					/>
					<input
						type="number"
						id="digit-6"
						class="
							form-control
							shadow
							p-3
							bg-white
							rounded
							text-center
						"
						name="digit-6"
						data-previous="digit-5"
						maxlength="1"
						v-model="digit_6"
					/>
				</div>
			</div>
		</div>
		<div class="col-4">
			<button
				class="
					form-control
					btn btn-outline-primary
					shadow
					py-3 py-xs-0
					my-xs-0
				"
				type="button"
				id="btn-get-otp"
			>
				ওটিপি লিখুন
			</button>
		</div>
	</div>
</template>

<script>
// importing jQuery
import jQuery from "jquery";
const $ = jQuery;
window.$ = $;

// jQuery code to accept OTP input
$(document).ready(function () {
	$(".digit-group")
		.find("input")
		.each(function () {
			$(this).on("keyup", function (e) {
				// Input the digit typed the last for accidental multiple input
				if ($(e.target).val() > 9) {
					$(e.target).val($(e.target).val() % 10);
				}

				var parent = $($(this).parent());
				var kCd = e.keyCode || e.which;

				// backspace and left
				if (kCd === 8 || kCd === 37 || kCd === 229) {
					var prev = parent.find("input#" + $(this).data("previous"));

					if (prev.length) {
						$(prev).select();
					}
				} else if (
					(kCd >= 48 && kCd <= 57) || // 0 - 9 normal keys
					(kCd >= 96 && kCd <= 105) || // 0 - 9 numpad keys
					kCd === 39 // Right arrow
				) {
					var next = parent.find("input#" + $(this).data("next"));

					if (next.length) {
						$(next).select();
					} else {
						document.activeElement.blur();
					}
				} else {
					$(e.target).val("");
				}
			});
		});
});
// jQuery code ends

export default {
	name: "OTPForm",
	data() {
		return {
			digit_1: "",
			digit_2: "",
			digit_3: "",
			digit_4: "",
			digit_5: "",
			digit_6: "",
			otp: null,
		};
	},
	methods: {
		printKey: function (e) {
			alert(e.keyCode);
		},
	},
	computed: {
		digits: function () {
			return [
				this.digit_1,
				this.digit_2,
				this.digit_3,
				this.digit_4,
				this.digit_5,
				this.digit_6,
			];
		},
	},
	created() {
		// window.addEventListener("keyup", this.printKey);
	},
	watch: {
		digits: function () {
			if (
				this.digit_1 !== "" &&
				this.digit_2 !== "" &&
				this.digit_3 !== "" &&
				this.digit_4 !== "" &&
				this.digit_5 !== "" &&
				this.digit_6 !== ""
			) {
				console.log(
					this.digit_1 +
						this.digit_2 +
						this.digit_3 +
						this.digit_4 +
						this.digit_5 +
						this.digit_6
				);
			}
		},
	},
};
</script >

<style scoped>
@media (max-width: 1400px) {
	.btn {
		padding-left: 0px;
		padding-right: 0px;
	}
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
	-webkit-appearance: none;
	margin: 0;
}

/* Firefox */
input[type="number"] {
	-moz-appearance: textfield;
}

.digit-group input {
	/* width: 50px;
	height: 50px; 
	background-color: #5c5c64;
	border: none;
	line-height: 50px;
	text-align: center;
	font-size: 24px;
	font-family: "Raleway", sans-serif;
	font-weight: 200;
	color: white;
	margin: 0 2px; */
	font-size: 16px;
	font-family: "Raleway", sans-serif;
	font-weight: 900;
	margin: 0 5px;
	padding-left: 0 !important;
	padding-right: 0 !important;
}
.digit-group .splitter {
	padding: 0 px;
	/* color: white; */
	font-size: 24px;
}

#digit-1 {
	margin-left: 0px !important;
}

#digit-6 {
	margin-right: 0px !important;
}
</style>