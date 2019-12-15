package foo;
import java.io.IOException;
import java.util.*;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.constraints.Null;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;

import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.EntityNotFoundException;
import com.google.appengine.api.datastore.FetchOptions;
import com.google.appengine.api.datastore.Key;
import com.google.appengine.api.datastore.KeyFactory;
import com.google.appengine.api.datastore.KeyRange;
import com.google.appengine.api.datastore.PreparedQuery;
import com.google.appengine.api.datastore.PropertyProjection;
import com.google.appengine.api.datastore.Query;
import com.google.appengine.api.datastore.Query.CompositeFilterOperator;
import com.google.appengine.api.datastore.Query.FilterOperator;
import com.google.appengine.api.datastore.Query.FilterPredicate;
import com.google.gson.Gson;
import com.google.appengine.repackaged.com.google.datastore.v1.CompositeFilter;
import com.google.appengine.repackaged.com.google.datastore.v1.Projection;
import com.google.appengine.repackaged.com.google.datastore.v1.PropertyFilter;

@WebServlet(name = "LikePost", urlPatterns = { "/likepost" })
public class LikePost extends HttpServlet {

    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String id_user = request.getParameter("id_user");
        String id_post = request.getParameter("id_post");

        response.setContentType("text/html");
        response.setCharacterEncoding("UTF-8");
        response.setHeader("Access-Control-Allow-Origin", "*");

//		Entity e = new Entity("Friend", "f" + i);
//		e.setProperty("firstName", "first" + i);
//		e.setProperty("lastName", "last" + i);
//		e.setProperty("age", r.nextInt(100) + 1);
//      e.setProperty("friends", fset);

        DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
        Key keyUser = KeyFactory.createKey("user", Long.parseLong(id_user));

        Query q = new Query("user")
                .setFilter(new FilterPredicate("__key__", FilterOperator.EQUAL, keyUser));
        PreparedQuery pq = datastore.prepare(q);
        List<Entity> result = pq.asList(FetchOptions.Builder.withDefaults());
        Key keyPost = KeyFactory.createKey("post", Long.parseLong(id_post));
        Query q2 = new Query("post")
                .setFilter(new FilterPredicate("__key__", FilterOperator.EQUAL, keyPost));
        PreparedQuery pq2 = datastore.prepare(q2);
        List<Entity> result2 = pq2.asList(FetchOptions.Builder.withDefaults());

        Query q3 = new Query("like")
                .setFilter(CompositeFilterOperator.and(
                        new FilterPredicate("id_user", FilterOperator.EQUAL, keyUser),
                        new FilterPredicate("id_post", FilterOperator.EQUAL, keyPost)));
        PreparedQuery pq3 = datastore.prepare(q3);
        List<Entity> result3 = pq3.asList(FetchOptions.Builder.withDefaults());

        Gson gson = new Gson();
        String[] res = new String[2];

        if(result3.size() == 0) {
            if (result.size() > 0 && result2.size() > 0) {
                Entity e = new Entity("like");
                e.setProperty("id_user", keyUser);
                e.setProperty("id_post", keyPost);
                datastore.put(e);
                res[0] = "1";
                res[1] = "";
            } else {
                res[0] = "0";
                res[1] = "L'utilisateur ou le post n'existe plus.";
            }
        }else{
            datastore.delete(result3.get(0).getKey());
            res[0] = "1";
            res[1] = "Removed";
        }

        response.getWriter().print(gson.toJson(res));

    }
}