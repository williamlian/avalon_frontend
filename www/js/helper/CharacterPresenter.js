var CharacterPresenter = {
	map: {
		merlin:{
			name: 'Merlin',
			desc: 'Can see evils, except Mordred',
			side: 'good',
		},
		percival:{
			name: 'Percival',
			desc: 'Can see Merlin and morgana',
			side: 'good',
		},
		royal_servant:{
			name: 'Royal Servant of Arthur',
			desc: 'No special abilities',
			side: 'good',
		},
		assassin:{
			name: 'Assassin',
			desc: 'Have a chance to assassinate Merlin',
			side: 'evil',
		},
		morgana:{
			name: 'Morgana',
			desc: 'Pretend to be Merlin and confuse Percival',
			side: 'evil',
		},
		mordred:{
			name: 'Mordred',
			desc: 'Evil who is unknown to Merlin',
			side: 'evil',
		},
		oberon:{
			name: 'Oberon',
			desc: 'Evil who does not know other evils',
			side: 'evil',
		},
		minion:{
			name: 'Minion of Mordred',
			desc: 'Evil without special abilities',
			side: 'evil'
		},
	},

	present: function(character) {
		var presented = this.map[character];
		presented['key'] = character;
		return presented;
	},

	presentList: function(list) {
		var presented = [];
		for(i = 0; i < list.length; i++) {
			presented.push( this.present([list[i]]) );
		}
		console.log(presented);
		return presented;
	},

};
