<template>

	<div>

		<div class="ladder">

			<label>

				<input
					type="checkbox"
					ref="highlight-header"
					@change="highlightHeader_OnChange()"
				>
				<span>Highlight header</span>

			</label>

			<label>

				<input
					type="checkbox"
					ref="same-width"
					@change="sameWidth_OnChange()"
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
					@input="minimumWidth_OnInput()"
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
							@change="sytle_OnChange()"
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
							@change="sytle_OnChange()"
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
										@change="sytle_OnChange()"
									>
									<span>Double border</span>
								</label>

								<label>
									<input
										type="radio"
										ref="ascii-single-border"
										name="ascii-border-style"
										@change="sytle_OnChange()"
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

	methods: {

		minimumWidth_OnInput() {

			const outputVue = head(this.$root.$children).$refs['output'];

			const { value } = this.$refs['min-width'];

			outputVue.options.minimumWidth = value;
		},

		highlightHeader_OnChange() {

			const outputVue = head(this.$root.$children).$refs['output'];

			const { checked } = this.$refs['highlight-header'];

			outputVue.options.highlightHeader = checked;
		},

		sameWidth_OnChange() {

			const outputVue = head(this.$root.$children).$refs['output'];

			const { checked } = this.$refs['same-width'];

			outputVue.options.sameWidth = checked;
		},

		sytle_OnChange() {

			const outputVue = head(this.$root.$children).$refs['output'];

			const style = this.$refs['mysql'].checked ? 'mysql' : 'ascii';

			outputVue.options.tableStyle.style = style;

			const border = this.$refs['ascii-double-border'].checked ? 'double' : 'single';

			outputVue.options.tableStyle.border = border;
		}

	},

	mounted() {

		const outputVue = head(this.$root.$children).$refs['output'];

		const { minimumWidth, highlightHeader, sameWidth } = outputVue.options;

		this.$refs['min-width'].value = minimumWidth;

		this.$refs['highlight-header'].checked = highlightHeader;

		this.$refs['same-width'].checked = sameWidth;

		const { style, border } = outputVue.options.tableStyle;

		this.$refs[style].checked = true;

		this.$refs[`ascii-${border}-border`].checked = true;
	}

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