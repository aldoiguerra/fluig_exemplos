<script type="text/javascript" src="/webdesk/vcXMLRPC.js"></script>
<script type="text/javascript" src="/fluig_trp_utils/resources/js/fastsales-1.0.js"></script>

<div id="CadFeeds_${instanceId}" class="super-widget wcm-widget-class fluig-style-guide" 
	data-params="CadFeeds.instance()">
    <ol class="breadcrumb">        
        <li>Cadastro de Feeds</li>
    </ol>

    <div class="row">
        <div style="text-align: center;" class="col-sm-12 col-xs-12 col-md-12 col-lg-12">
            <h1>Cadastro de Feeds</h1>
        </div>
    </div>

    <hr style="margin-top: 10px" />

    <!-- AREA DE CRUD PARA OS REGISTROS -->
    <div id="crudArea" style="display: none">
        <div id="datatable-area-action" class="template-row-area-buttons" class="col-md-6">
            <button class="btn btn-primary" data-novo-registro><span
                    class="fluigicon fluigicon-plus-circle fluigicon-sm"></span> Adicionar
            </button>
        </div>
        <div id="progresso-importacao" style="display: none; margin-top: 10px">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h3 class="panel-title"><a href="#coll-csv-cad" aria-expanded="true" data-toggle="collapse"> ${i18n.getTranslation('csv.cad')} <span id="imp-csv-cad-progresso" style="font-weight: bold">${i18n.getTranslation('csv.reg')}</span></a></h3>
                </div>
                <div class="panel-body collapse in panel-collapse" id="coll-csv-cad">
                    <div class="progress">
                        <div id="progress-bar-cadastro"
                            class="progress-bar progress-bar-cadastro progress-bar-success progress-bar-striped"
                            role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"
                            style="width: 0%">
                            ${i18n.getTranslation('csv.percent')}
                        </div>
                    </div>
                    <textarea id="csv-rel-cad" rows="3" class="form-control" data-validation="string"></textarea>
                </div>
            </div>
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h3 class="panel-title"><a href="#coll-csv-inat" aria-expanded="true" data-toggle="collapse"> ${i18n.getTranslation('csv.inat')} <span id="imp-csv-inat-progresso" style="font-weight: bold">${i18n.getTranslation('csv.reg')}</span></a></h3>
                </div>
                <div class="panel-body collapse in panel-collapse" id="coll-csv-inat">
                    <div class="progress">
                        <div id="progress-bar-inativos"
                            class="progress-bar progress-bar-inativos progress-bar-success progress-bar-striped"
                            role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"
                            style="width: 0%">
                            ${i18n.getTranslation('csv.percent')}
                        </div>
                    </div>
                    <textarea id="csv-rel-inat" rows="3" class="form-control" data-validation="string"></textarea>
                </div>
            </div>
        </div>
        <div id="list">
        </div>
        <div class="row">
            <div class="text-center">
                <button id="ver-mais" class="btn btn-default">Ver mais</button>
            </div>
        </div>
    </div>

    <script type="text/template" class="template-tr">
        <tr >
            <td title="{{titulo}}"
                style="{{#inativo}}text-decoration: line-through;{{/inativo}}">
                {{titulo}}
            </td>
<!--             <td title="{{supervisor}}" -->
<!--                 style="{{#inativo}}text-decoration: line-through;{{/inativo}}"> -->
<!--                 {{supervisor}} -->
<!--             </td> -->
            <td>
                <button data-edita-registro type="button" class="btn btn-warning btn-sm"><span
                            class="fluigicon fluigicon-pencil fluigicon-xs"></span> Editar
                </button>
                <button data-excluir-registro type="button" class="btn btn-danger btn-sm"><span
                    class="fluigicon fluigicon-remove fluigicon-xs"></span> Excluir
                </button>
            </td>
        </tr>
    </script>
</div>