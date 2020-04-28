function defineStructure() {

}

function onSync(lastSyncDate) {

}

function createDataset(fields, constraints, sortFields) {

  //DataSet para realizar consultas a base interna do fluig
  inicioG = new Date().getTime();

  var newDataset = DatasetBuilder.newDataset();

  var dataSource = "/jdbc/AppDS";
  var ic = new javax.naming.InitialContext();
  var ds = ic.lookup(dataSource);
  var created = false;

  try {
    var conn = ds.getConnection();

    if ((fields == null) || ((fields != null) && (fields.length != 2))) {
      return newDataset;
    }
    var myQuery = fields[0];
    var multiplas = fields[1];

    var stmt = conn.createStatement();

    var listaQuery = [myQuery];
    if (multiplas == "1") {
      listaQuery = myQuery.split(";");
    }

    for (var pq = 0; pq < listaQuery.length; pq++) {

      var myQuery = listaQuery[pq];

      inicio = new Date().getTime();

      var isResultSet = stmt.execute(myQuery);

      tempoExe = (new Date().getTime()) - inicio;

      var hasMoreResult = true;

      while (hasMoreResult) {
        if (isResultSet) {
          if (created) {
            isResultSet = stmt.getMoreResults();
            continue;
          }
          var rs = null;
          try {
            inicio = new Date().getTime();

            rs = stmt.getResultSet();

            tempoRs = (new Date().getTime()) - inicio;

            columnCount = rs.getMetaData().getColumnCount();
            if (!created) {
              var colunas = new Array();
              for (var i = 1; i <= columnCount; i++) {
                newDataset.addColumn(rs.getMetaData().getColumnLabel(i));
                colunas.push(rs.getMetaData().getColumnLabel(i));
              }
              rs.last();
              var count = rs.getRow();
              rs.beforeFirst();

              var Arr = new Array();
              Arr[0] = "Registros: " + count;
              Arr[1] = "Tempo exe: " + tempoExe;
              Arr[2] = "Tempo rs: " + tempoRs;
              for (var i = 4; i <= columnCount; i++) {
                Arr[i - 1] = ""
              }
              newDataset.addRow(Arr);
              created = true;
            }
            while (rs.next()) {
              var Arr = new Array();
              for (var i = 1; i <= columnCount; i++) {
                var obj = rs.getObject(i);
                if (null != obj) {
                  Arr[i - 1] = replaceAllAspas(rs.getObject(i).toString());
                } else {
                  Arr[i - 1] = "null";
                }
              }
              newDataset.addRow(Arr);
            }

          } finally {
            if (rs != null) {
              rs.close();
            }
          }
        } else {

          var rowCount = stmt.getUpdateCount();
          if (rowCount == -1) {
            hasMoreResult = false;
          } else {
            if (!created) {
              newDataset.addColumn("LINHAS");
              created = true;
            }
            newDataset.addRow(new Array(rowCount.toString()));
          }

        }
        isResultSet = stmt.getMoreResults();
      }


    }

  } catch (e) {
    log.error("######################### ERRO==============> " + e.message);
    var newDataset = DatasetBuilder.newDataset();
    newDataset.addColumn("STATUS");
    newDataset.addRow(new Array("ERRO=> " + e.message));
  } finally {
    if (stmt != null) {
      stmt.close();
    }
    if (conn != null) {
      conn.close();
    }
  }

  tempoT = (new Date().getTime()) - inicioG;

  var Arr = new Array();
  Arr[0] = "Tempo total: " + tempoT;
  for (var i = 2; i <= columnCount; i++) {
    Arr[i - 1] = ""
  }
  newDataset.addRow(Arr);

  return newDataset;
}

function onMobileSync(user) {

}

function replaceAllAspas(valor) {
  try {
    return valor.replace(/'/g, "''");
  } catch (ex) {
    return valor.replace("'", "''");
  }
}