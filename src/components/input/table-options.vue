<template>

	<div>

		<div
			class="badge ladder spaced-v bm-l"
			:class="stateNonHTMLStyleParent"
		>

			<label class="train spaced-h">
				<p>Align Header:</p>
				<select
					:class="stateNonHTMLStyle"
					:disabled="isHTMLStyle"
					@change="onChange($event, {key:'header'})"
					v-model="columnsAlignment.header"
				>
					<option value="left">Left</option>
					<option value="center">Center</option>
					<option value="right">Right</option>
				</select>
			</label>

			<div>
				<label>
					<p>Align body rows</p>
					<select
						:class="['rm-xs',stateNonHTMLStyle]"
						:disabled="isHTMLStyle"
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

			<label :class="stateNonHTMLStyle">

				<input
					type="checkbox"
					ref="highlight-header"
					:class="stateNonHTMLStyle"
					:disabled="isHTMLStyle"
					v-model="highlightHeader"
				>
				<span>Highlight header</span>

			</label>

			<label :class="stateNonHTMLStyle">

				<input
					type="checkbox"
					ref="spreadsheet"
					:class="stateNonHTMLStyle"
					:disabled="isHTMLStyle"
					v-model="spreadsheet"
				>
				<span>Spreadsheet</span>

			</label>

			<label :class="stateNonHTMLStyle">

				<input
					type="checkbox"
					ref="same-width"
					:class="stateNonHTMLStyle"
					:disabled="isHTMLStyle"
					v-model="sameWidth"
				>
				<span>Same width columns</span>

			</label>

			<label class="train spaced-h">

				<p>Minimum column width:</p>
				<input
					type="number"
					ref="min-width"
					min="2"
					value="6"
					:disabled="isHTMLStyle"
					v-model="minimumWidth"
				>

			</label>

			<label class="train spaced-h">
				<p>Comment Sytle:</p>
				<select
					:class="['large', stateNonHTMLStyle]"
					:disabled="isHTMLStyle"
					v-model="commentStyle.style"
				>
					<option value="custom">Custom</option>
					<option value="doubleslant">// JavaScript</option>
					<option value="slantsplat">/* ... */ CSS</option>
					<option value="xml">&lt;!-- --&gt; XML</option>
				</select>

				<p class="lm-xl">Before:</p>
				<input
					class="small"
					type="text"
					:disabled="isHTMLStyle"
					v-model="commentStyle.before"

				>

				<p class="lm-xl">After:</p>
				<input
					class="small"
					type="text"
					:disabled="isHTMLStyle"
					v-model="commentStyle.after"
				>

			</label>

		</div>

		<div class="badge spaced-v">

			<p>Table style:</p>

			<div class="train-drift">

				<label :class="['inner-badge pointer rm-xl', styleStateMySQL]">

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

				<label :class="['inner-badge pointer rm-xl', styleStateASCII]">

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

							<label class="pointer">
								<input
									type="radio"
									ref="ascii-double-border"
									name="ascii-border-style"
									value="double"
									v-model="tableStyle.border"
								>
								<span>Double border</span>
							</label>

							<label class="pointer">
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

				<label :class="['inner-badge pointer rm-xl', styleStateHTML]">

					<input
						type="radio"
						ref="html"
						name="style"
						value="html"
						class="pointer"
						v-model="tableStyle.style"
					>
					<span>HTML</span>

					<div>
						<pre class="ladder">
                            <code class="demo">&lt;table&gt;</code>
                            <code class="demo">    &lt;thead&gt;&lt;tr&gt;&lt;th&gt;&lt;/th&gt;&lt;/tr&gt;</code>
                            <code class="demo">    &lt;/thead&gt;</code>
                            <code class="demo">    &lt;tbody&gt;&lt;tr&gt;&lt;td&gt;&lt;/td&gt;&lt;/tr&gt;</code>
                            <code class="demo">    &lt;/tbody&gt;</code>
                            <code class="demo">&lt;/table&gt;</code>
                            
                            </pre>
					</div>

				</label>

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
			spreadsheet: false,
			sameWidth: false,
			minimumWidth: 6,
			commentStyle: {
				style:'custom',
				before:'',
				after:''
			},
			tableStyle: {
				style: 'mysql',
				border: 'double'
			}
		};

	},

	methods: {

		onChange(event, parcel) {

			const alignObj = this.columnsAlignment[parcel.key];
			const align = alignObj[parcel.index] || alignObj;

			parcel.align = align;

			window.EventVue.$emit('updateAlign', parcel);
		},

		styleStateTableStyle(event) {

			console.log(event);
		}
	},

	computed: {

		columnsCount() {

			return this.$parent.columnsCount;
		},

		alignmentsOptions() {

			return ['left', 'center', 'right'];
		},

		styleStateMySQL() {

			return this.tableStyle.style === 'mysql' ? 'table-style--selected' : '';
		},

		styleStateASCII() {

			return this.tableStyle.style === 'ascii' ? 'table-style--selected' : '';
		},

		styleStateHTML() {

			return this.isHTMLStyle ? 'table-style--selected' : '';
		},

		stateNonHTMLStyle() {

			return this.isHTMLStyle ? '' : 'pointer';
		},

		stateNonHTMLStyleParent() {

			return this.isHTMLStyle ? 'dark' : '';
		},

		isHTMLStyle() {

			return this.tableStyle.style === 'html';
		}

	},

	watch: {

		'tableStyle.style'(value) {

			const outputVue = head(this.$root.$children).$refs['output'];

			outputVue.isHTML = this.tableStyle.style === 'html';
		}
	}
}
</script>

<style scoped>
code.demo {
	font-family: "Lucida Console", Monaco, monospace;
	font-size: 11px;
}

.badge {
	padding: 8px;
	background-color: #fafafa;
	border-radius: 3px;
	border: 1px solid #b4b4b4;
	box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2),
		0 2px 0 0 rgba(255, 255, 255, 0.7) inset;
}

.inner-badge {
	padding: 8px;
	border-radius: 3px;
	border: 1px solid #b4b4b4;
}

.spaced-v > * + * {
	margin-top: 8px;
}
.spaced-h > * + * {
	margin-left: 8px;
}

.lm-xl {
	margin-left: 32px;
}

.dark {
	background-image: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1));
}

.table-style--selected {
	background-image: linear-gradient(rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05));
}

.large {
	width: 128px;
}

.small {
	width: 48px;
}
</style>