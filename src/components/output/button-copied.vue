<template>

	<button
		id="search-button"
		:class="['button-fancy train bm-m end', styleStateCopied]"
		@click="copyToClipboard_OnClick()"
	>
		<img
			width="16"
			height="16"
			src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAABLElEQVQoz2WROy9EURSFz3gEheRqdNNIhJB4FTqFP6AdM5GMR+jUNH4EjaCjnaGaXkQU4g8MMfHK6CRCREh81tn7zsTjnqx7V85eZ+191g0hEIQ2YZoP4EsLXpjUTkv4UR7njUuGGBXLcsqW78dyqzDMo86di2VMXmI3CnAb+rgjPhfi7algO3J36KWq4qewYacmGOGYCgnyi4JZ6gyq84CdXeeZE840RZ0xd8hzZb3jLCvy2dG3Uzhi0QUFat6Pol1xT6xLOGShIbi274yK78KceMdvBxeUWKOHbGgk0xTkqVlc5WipW2T+CgpxSOu5ZDn8c5jSPyizzxM5d0jTdIEZFjlgU2Hn0uDdoXmLTLpRYlXvhG6tRKzCvAuibQxmmVeNe2vrhnse6A/hG5Ji/bc9GHASAAAAAElFTkSuQmCC"
			alt=""
		>
		<span class="lm-m">Copy to Clipboard</span>
	</button>

</template>

<script>
export default {

	data() {

		return {

			copied: false
		}
	},

	methods: {		

		copyToClipboard_OnClick() {

			const text = this.$parent.$refs['result'].innerText;

			navigator.clipboard.writeText(text).then(() => {

				this.copied = true;				

			}, function (err) {

				/* eslint-disable-next-line */
				console.error(err);
			});

		},
	},

	computed: {

		styleStateCopied() {

			return this.copied ? 'button--green' : 'button--blue';
		}
	}

}
</script>

<style scoped>
.button-fancy {
	cursor: pointer;
	font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
		Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
	font-size: 14px;
	font-weight: bold;

	border-radius: 3px;
	padding: 6px 16px;
	color: #fff;
	text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.3);
	box-shadow: 0 1px 0 rgba(255, 255, 255, 0.2) inset;
}

.button--blue {
	background-color: #326ebe;
	border: 1px solid #2e6fb9;
}

.button--green {
	background-color: #5cb85c;
	border: 1px solid #3f853f;
}

.button-fancy:active {
	filter: brightness(90%);
}

.button-fancy:enabled:hover {
	background-image: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1));
}

.end {
	margin-left: auto;
}
</style>