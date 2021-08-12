<template>
	<div class="row align-items-center">
		<div
		id="carouselExampleCaptions"
		class="carousel slide"
		data-bs-ride="carousel"
	>
		<div class="carousel-inner">
			<div class="carousel-item active">
				<div class="px-4">
					<h1
						class="display-5 fw-bold mx-auto col-lg-12"
						id="intro-title"
					>
						'প্রিয় পাবনা জেলার ভোটার, আমি আপনাদের স্মরণ ব্রো। এবার
						জেলা পরিশোধ নির্বাচনে আপনার দোয়া এবং ভোট প্রত্যাশী'
					</h1>
					<div class="col-lg-12 mx-auto">
						<p class="lead mb-4" id="intro-text">
							দেশের যে কোনো ধরনের নির্বাচনে আপনার এলাকার ভোটারদের
							মোবাইল নাম্বারে আপনার কণ্ঠে রেকোর্ড করা শুভেচ্ছা
							বার্তা বা দোয়া প্রত্যাশী ভয়েস কল পাঠাতে পারবেন
							মেনিডায়াল এর মাধ্যমে, এক ক্লিকেই! মনে আছে, আমাদের
							মাননীয় প্রধানমন্ত্রী শেখ হাসিনার গত নির্বাচনে পাঠানো
							এমনই একটা ভয়েস কলের কথা? তথ্য প্রযুক্তির যুগে, আপনার
							এলাকাতেও সম্ভব হাজারো ভোটারের কাছে পৌঁছে যাওয়া,
							মেনিডায়াল এর মাধ্যমে।
						</p>
					</div>
				</div>
			</div>
			<div class="carousel-item">
				<div class="px-4">
					<h1
						class="display-5 fw-bold mx-auto col-lg-12"
						id="intro-title"
					>
						‘প্রিয় শিক্ষার্থী, আমি তোমাদের প্রিন্সিপ্যাল স্যার বলছি।
						লক ডাউনের এই সময়ে তোমরা সবাই নিরাপদে বাসায় অবস্থান করো’
					</h1>
					<div class="col-lg-12 mx-auto">
						<p class="lead mb-4" id="intro-text">
							যে কোনো শিক্ষা প্রতিষ্ঠান চাইলেই মেনিডায়াল ওয়েবসাইট
							ব্যবহার করতে পারবে তার ছাত্র-ছাত্রী, অভিভাবক বা
							শিক্ষকের মাঝে এক ক্লিকেই বিভিন্ন
							নির্দেশনামূলক/তথ্যমূলক বা অনুপ্রেরণা মূলক ভয়েস কল
							পাঠাতে। এক সঙ্গেই কল যাবে হাজারো শিক্ষার্থীর
							মোবাইলে। লক ডাউনের এই সময়ে মেনি ডায়াল এর মত একটি
							যোগাযোগ মাধ্যম হতে পারে শিক্ষাপ্রতিষ্ঠান গুলোর জন্য
							সবচেয়ে গুরুত্বপুর্ণ টুল।
						</p>
					</div>
				</div>
			</div>
			<div class="carousel-item">
				<div class="px-4">
					<h1
						class="display-5 fw-bold mx-auto col-lg-12"
						id="intro-title"
					>
						‘প্রিয় কর্মী, আগামীকাল থেকে শুরু হওয়া লক-ডাউনে সঠিক
						বিধিনিষেধ মেনে খোলা থাকবে, আপনাদের প্রিয় আহমেদ টেক্সটাইল
						এবং গার্মেন্টস লিমিটেড।’
					</h1>
					<div class="col-lg-12 mx-auto">
						<p class="lead mb-4" id="intro-text">
							দেশ ব্যাপি ছড়িয়ে থাকা অসংখ্য গার্মেন্টস বা শিল্প
							কারখানা মেনিডায়াল ব্যবহার করে এক ক্লিকেই তাঁদের সকল
							কর্মীদের পাঠাতে পারবে জরুরী ভয়েস কল। এক সেকেন্ডেই
							হাজারো কল পৌঁছে যাবে সবার কাছে। শুধু শিল্প কারখানা
							নয়, যেকোনো ছোট বড় কর্পোরেট অফিস বা স্টার্টাপ-ও তার
							ভেন্ডর, সাপ্লায়ার বা কাস্টোমারকে পাঠাতে পারে এমন
							ভয়েস কল।
						</p>
					</div>
				</div>
			</div>
		</div>
		<button
			class="carousel-control-prev"
			type="button"
			data-bs-target="#carouselExampleCaptions"
			data-bs-slide="prev"
		>
			<span class="carousel-control-prev-icon" aria-hidden="true"></span>
			<span class="visually-hidden">Previous</span>
		</button>
		<button
			class="carousel-control-next"
			type="button"
			data-bs-target="#carouselExampleCaptions"
			data-bs-slide="next"
		>
			<span class="carousel-control-next-icon" aria-hidden="true"></span>
			<span class="visually-hidden">Next</span>
		</button>
	</div>
	</div>
</template>

<script>
export default {
	name: "FormIntro",
};
</script>

<style scoped>
#intro-title {
	color: #0080ff;
	font-size: 36px;
	padding-bottom: 30px;
}

#intro-text {
	font-size: 16px;
}

.carousel-caption {
	color: #000;
	top: 50%;
}

.carousel-item.active,
.carousel-item-next,
.carousel-item-prev {
	display: block;
}
.carousel {
  margin: 0 auto;
}
</style>