var expect = require('../node_modules/chai').expect,
	plumin = require('../dist/plumin');

describe('Font', function() {
	before(function() {
		plumin.setup({
			width: 1024,
			height: 1024
		});
	});

	describe('#addGlyph', function() {
		it('should add a glyph to the glyphMap, charMap and altMap of the font', function() {
			var font = new plumin.Font(),
				expected = [
					0 + '',
					'A'.charCodeAt(0) + '',
					'B'.charCodeAt(0) + '',
					'C'.charCodeAt(0) + ''
				];

			font.addGlyph({name: 'A', unicode: 'A'.charCodeAt(0)});
			font.addGlyph({name: 'B', unicode: 'B'.charCodeAt(0)});
			font.addGlyph({name: 'C', unicode: 'C'.charCodeAt(0)});

			expect(Object.keys( font.glyphMap )).to.deep.equal(['.notdef', 'A', 'B', 'C']);
			expect(Object.keys( font.charMap )).to.deep.equal( expected );
			expect(Object.keys( font.altMap )).to.deep.equal( expected );
		});

		it('should handle two glyphs sharing the same unicode', function() {
			var font = new plumin.Font(),
				a = {name: 'A', unicode: 'A'.charCodeAt(0)},
				aBis = {name: 'A bis', unicode: 'A'.charCodeAt(0)},
				aTer = {name: 'A ter', unicode: 'A'.charCodeAt(0)};

			font.addGlyph(aTer);
			font.addGlyph(aBis);
			font.addGlyph(a);

			expect(Object.keys( font.glyphMap )).to.deep.equal(['.notdef', 'A ter', 'A bis', 'A']);
			expect( font.charMap['A'.charCodeAt(0)] ).to.equal( a );
			expect( font.altMap['A'.charCodeAt(0)] ).to.deep.equal([aTer, aBis, a]);
		});
	});

});