package br.com.totvsrp;

import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.SQLException;

public class Conexao {

  private DataSource dataSource;
  private Connection conn;

  public Conexao() throws NamingException, SQLException {
    InitialContext ic = new javax.naming.InitialContext();
    dataSource = (DataSource) ic.lookup("java:/jdbc/FluigDS");
    this.conn = dataSource.getConnection();
  }

  public Connection getConnection() throws SQLException {
    if(conn == null){
      this.conn = dataSource.getConnection();
    }
    return this.conn;
  }

  public void close(){
    try {
      if(conn != null) {
        this.conn.close();
        this.conn = null;
      }
    } catch (SQLException e) {
      e.printStackTrace();
    }
  }

}
