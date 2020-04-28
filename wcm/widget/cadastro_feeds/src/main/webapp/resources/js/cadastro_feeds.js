var CadFeeds = SuperWidget.extend({
	// variáveis da widget
	datatable: null,
	nomeDataset: "dsFeeds",
	columnSearch: ['titulo'],

	// CAMPOS QUE SERÃO EXIBIDOS NA TELA
	headerDatatable: [{
		'title': 'Título'
	}, {
		'title': 'Ações'
	}],

	// método iniciado quando a widget é carregada
	init: function () {

		$(".pageTitle").parent().remove();

		if (!this.isEditMode) {
			this.initFastsales();
		}
	},

	// BIND de eventos
	bindings: {
		local: {
			'novo-registro': ['click_novoRegistro'],
			'edita-registro': ['click_editaRegistro'],
			'excluir-registro': ['click_excluirRegistro']
		},
		global: {
			'save-modal': ['click_saveModal']
		}
	},

	initFastsales: function () {

		var ref = this;

		fastsales(ref.nomeDataset, ref.headerDatatable, null,
			function (datatable) {
				ref.datatable = datatable;

			}, function (row) {

			}, ['titulo'], ref.columnSearch);
	},

	novoRegistro: function (htmlElement, event) {
		
		novo('Novo Feed');
	},

	editaRegistro: function () {
		var ref = this;

		var row = ref.datatable.selectedRows()[0], data = ref.datatable
			.getRow(row);

		console.log("dados da linha: ", data);

		editar(data["metadata#id"], data["metadata#version"],
			true, 'Atualizar');

	},

	excluirRegistro: function () {
		var ref = this;
		var row = ref.datatable.selectedRows()[0], data = ref.datatable.getRow(row);

		console.log("dados da linha: ", data);

		excluir(data["metadata#id"], function () {

		});

	},

	saveModal: function (e) {
		var ref = this;
//		var errors = '', name, valor, promotor;//, validarPromotor = false;

//		$('#iframe-manutencao-crud').contents().find('select').each(function () {
//			name = $(this).attr('name');
//			valor = $(this).val();
//
//			if (valor == null) {
//				errors += 'Informe um ' + name + ' corretamente! <br>';
//			} else if (name === 'promotor') {
//				//validarPromotor = true;
//				promotor = valor[0];
//			}
//		});

//		if (ref.edit === false) { // && validarPromotor == true) {
//			if (verificarPromotorJaCadastrado(promotor) == true)
//				errors += 'Promotoro já cadastrado! <br>';
//		}
//
//		if (errors != '') {
//			FLUIGC.toast({
//				message: errors,
//				type: 'danger'
//			});
//			return;
//		}

		salvar(true, function () {

		});
	},
});
