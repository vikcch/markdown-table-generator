<template>

	<td>

		<input
			type="text"
			ref="cell"
			:class="['cell', styleState, alignmentState]"
			:value="intel.value"
			@input="onInput()"
		>

	</td>

</template>

<script>
import { head } from '../../units/absx';
import { validator } from '../../units/fxnl';
export default {

	props: {

		intel: Object
	},

	data() {

		return {

			align: 'right'
		};
	},

	methods: {

		onInput() {

			const { index } = this.intel;

			const text = this.$refs['cell'].value;

			const work = {

				header: () => this.$parent.$data.tableHeader[index] = text,

				body: () => this.$parent.$props.intel[index] = text,
			};

			work[this.intel.key].call();

			head(this.$root.$children).$refs['output'].$forceUpdate();
		}
	},

	computed: {

		styleState() {

			return `cell--${this.intel.key}`;
		},

		alignmentState() {

			return `text-${this.align}`;
		}
	},

	created() {

		window.EventVue.$on('updateAlign', (parcel) => {

			const sameIndex = parcel => parcel.index === this.intel.index;
			const sameKey = parcel => parcel.key === this.intel.key;

			const work = {

				header: validator(sameKey),
				body: validator(sameIndex, sameKey),
			};

			const parcelValidator = work[parcel.key];

			if (parcelValidator(parcel)) {

				this.align = parcel.align;
			}
		});
	}
}
</script>

<style scoped>
.cell {
	border: 1px solid gray;
	padding: 4px 8px;
}

.cell--header {
	background-color: lightgrey;
}

.text-left {
	text-align: left;
}
.text-center {
	text-align: center;
}
.text-right {
	text-align: right;
}
</style>