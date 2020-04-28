package br.com.totvsrp;

import org.json.JSONArray;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class Feeds {

  private static final Logger log = LoggerFactory.getLogger(Feeds.class);
  private Conexao conexao;

  public Feeds(Conexao conexao) {
    this.conexao = conexao;
  }

  public JSONArray buscarFeeds() {
    PreparedStatement stmt = null;
    JSONArray listaImprimir = new JSONArray();
    try {

      Connection conn = conexao.getConnection();
      String nomeTabela = "";

      stmt = conn.prepareStatement("SELECT COD_EMPRESA,COD_LISTA FROM DOCUMENTO WHERE NM_DATASET = 'dsFeeds'");
      ResultSet rs = stmt.executeQuery();
      while (rs.next()) {
        String codEmpresa = rs.getString("COD_EMPRESA");
        String codLista = rs.getString("COD_LISTA");
        if (codEmpresa.length() == 1) {
          codEmpresa = "00" + codEmpresa;
        } else if (codEmpresa.length() == 2) {
          codEmpresa = "0" + codEmpresa;
        }
        if (codLista.length() == 1) {
          codLista = "00" + codLista;
        } else if (codLista.length() == 2) {
          codLista = "0" + codLista;
        }

        nomeTabela = "ML" + codEmpresa + codLista;
      }

      if (!nomeTabela.equals("")) {

        stmt = conn.prepareStatement("SELECT titulo,descricao,imagem FROM " + nomeTabela
            + " INNER JOIN DOCUMENTO ON documentid = NR_DOCUMENTO AND companyid = COD_EMPRESA AND VERSAO_ATIVA = 1");
        ResultSet rsTabela = stmt.executeQuery();
        while (rsTabela.next()) {
          String titulo = rsTabela.getString("titulo");
          String descricao = rsTabela.getString("descricao");
          String imagem = rsTabela.getString("imagem");

          JSONObject jsonConteudo = new JSONObject();
          jsonConteudo.put("titulo", titulo);
          jsonConteudo.put("descricao", descricao);
          jsonConteudo.put("imagem", imagem);

          listaImprimir.put(jsonConteudo);
        }

      }

    } catch (Exception e) {
      log.error("ERRO REST: " + e.getMessage(), e);
    } finally {
      if (stmt != null)
        try {
          stmt.close();
        } catch (SQLException e) {
          e.printStackTrace();
        }
    }
    return listaImprimir;
  }

}
