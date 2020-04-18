<template>

	<div>

		<div class="ladder">

			<label>
				<p>ALign Header</p>
				<select
					@change="onChange($event, {key:'header'})"
					v-model="columnsAlignment.header"
				>
					<!-- <option
						v-for="(option, index) in alignmentsOptions"
						v-bind:value="option"
						:key="index"
					>{{ option }}</option> -->
					<option value="left">Left</option>
					<option value="center">Center</option>
					<option value="right">Right</option>
				</select>
			</label>

			<div>
				<label>
					<p>ALign body rows</p>
					<select
						@change="onChange($event, {index, key:'body'})"
						v-for="(col,index) in columnsCount"
						:key="index"
						v-model="columnsAlignment.body[index]"
					>
						<option value="left">Left</option>
						<option value="center">Center</option>
						<option value="right">Right</option>
					</select>
				</label>

			</div>

			<label>

				<input
					type="checkbox"
					ref="highlight-header"
					v-model="highlightHeader"
				>
				<span>Highlight header</span>

			</label>

			<label>

				<input
					type="checkbox"
					ref="same-width"
					v-model="sameWidth"
				>
				<span>Same width columns</span>

			</label>

			<label>

				<span>Columns minimum width</span>
				<input
					type="number"
					ref="min-width"
					min="2"
					value="6"
					v-model="minimumWidth"
				>

			</label>

			<div>
				<p>Table style:</p>

				<div class="train-drift">

					<label class="rm-xl">

						<input
							type="radio"
							ref="mysql"
							name="style"
							value="mysql"
							v-model="tableStyle.style"
						>
						<span>MySQL</span>

						<div>
							<pre class="ladder">
                            <code class="demo">+--------+--------+</code>
                            <code class="demo">| Header | Header |</code>
                            <code class="demo">+--------+--------+</code>
                            <code class="demo">|   data |   data |</code>
                            <code class="demo">|   data |   data |</code>
                            <code class="demo">+--------+--------+</code>
                            </pre>
						</div>

					</label>

					<label>

						<input
							type="radio"
							ref="ascii"
							name="style"
							value="ascii"
							v-model="tableStyle.style"
						>
						<span>Ascii</span>

						<div class="train">

							<div>
								<pre class="ladder">
								<code class="demo">╔════════╤════════╗</code>
								<code class="demo">║ Header │ Header ║</code>
								<code class="demo">╟────────┼────────╢</code>
								<code class="demo">║   data │   data ║</code>
								<code class="demo">║   data │   data ║</code>
								<code class="demo">╚════════╧════════╝</code>
								</pre>
							</div>

							<div class="ladder lm-m">

								<label>
									<input
										type="radio"
										ref="ascii-double-border"
										name="ascii-border-style"
										value="double"
										v-model="tableStyle.border"
									>
									<span>Double border</span>
								</label>

								<label>
									<input
										type="radio"
										ref="ascii-single-border"
										name="ascii-border-style"
										value="single"
										v-model="tableStyle.border"
									>
									<span>Single border</span>
								</label>

							</div>

						</div>

					</label>

				</div>

			</div>

		</div>

	</div>

</template>

<script>
import { head } from './../../units/absx';

export default {

	data() {

		return {
			columnsAlignment: {
				header: 'right',
				body: ['right', 'right', 'right']
			},
			highlightHeader: true,
			sameWidth: false,
			minimumWidth: 6,
			tableStyle: {
				style: 'mysql',
				border: 'double'
			}
		};

	},

	methods: {

		onChange(event, parcel) {


			console.log(parcel);
			console.log('***********');

			// const dataName = `${parcel.key}ColumnsAlignment`;

			// const align = this[dataName][parcel.index];


			const alignObj = this.columnsAlignment[parcel.key];
			const align = alignObj[parcel.index] || alignObj;

			// debugger;
			// const parcel = { align, index, key: 'body' };

			parcel.align = align;

			window.EventVue.$emit('updateAlign', parcel);
		}
	},

	computed: {

		columnsCount() {

			return this.$parent.columnsCount;
		},

		alignmentsOptions() {

			return ['left', 'center', 'right'];
		}
	},


}
</script>

<style scoped>
code.demo {
	/* FIXME:: size */
	/* font-family: "Courier New", Courier, monospace; */
	/* font-size: 8pt; */
	font-size: 12pt;
}
</style>