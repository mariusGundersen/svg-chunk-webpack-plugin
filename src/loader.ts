const PACKAGE_NAME = require('../package.json').name;

/**
 * Loader for SVG files
 * Content are not edited, just stringified
 * The plugin create sprites
 */
export = function spriteLoader(this: any, content: string): string {
	const compiler = this._compiler;

	// Declare all SVG files as side effect
	// https://github.com/webpack/webpack/issues/12202#issuecomment-745537821
	this._module.factoryMeta = this._module.factoryMeta || {};
	this._module.factoryMeta.sideEffectFree = false;

	this._module.buildInfo.SVG_CHUNK_WEBPACK_PLUGIN = true;

	// Check if content is a SVG file
	if (!content.includes('<svg')) {
		throw new Error(`${PACKAGE_NAME} exception. ${content}`);
	}

	// Check if the plugin is also imported
	const plugin = compiler.options.plugins.find(
		(plugin: any) => plugin.PLUGIN_NAME && plugin.PLUGIN_NAME === PACKAGE_NAME
	);
	if (typeof plugin === 'undefined') {
		throw new Error(`${PACKAGE_NAME} requires the corresponding plugin`);
	}

	return JSON.stringify(content);
};
