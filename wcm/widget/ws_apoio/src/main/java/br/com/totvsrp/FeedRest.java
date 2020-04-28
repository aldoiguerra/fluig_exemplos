package br.com.totvsrp;

import org.json.JSONArray;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;

@Path("/feed")
public class FeedRest {

  private static final Logger log = LoggerFactory.getLogger(FeedRest.class);
  private Conexao conexao;

  @GET
  @Path("/ping")
  @Produces(MediaType.APPLICATION_JSON)
  @Consumes(MediaType.APPLICATION_JSON)
  public Response ping() {
    try {

      JSONObject jp = new JSONObject();
      jp.put("status", "pong");
      jp.put("version", 1);

      return Response.status(200).entity(jp.toString()).build();

    } catch (Exception e) {
      // log.error("ERRO REST: " + e.getMessage(), e);
      return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(e).build();
    }
  }

  @GET
  @Path("/feeds")
  @Produces("application/json; charset=UTF-8")
  @Consumes("application/json; charset=UTF-8")
  public Response feeds() {
    try {

      JSONObject jp = new JSONObject();

      conexao = new Conexao();
      Feeds feeds = new Feeds(conexao);

      jp.put("feeds", feeds.buscarFeeds());

      conexao.close();

      return Response.status(200).entity(jp.toString()).build();

    } catch (Exception e) {
      // log.error("ERRO REST: " + e.getMessage(), e);
      if (conexao != null)
        conexao.close();

      return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(e).build();
    }
  }

}