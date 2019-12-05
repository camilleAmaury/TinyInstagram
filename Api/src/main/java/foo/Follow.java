package foo;
import java.io.IOException;
import java.util.*;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

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

@WebServlet(name = "Follow", urlPatterns = { "/follow" })
public class Follow extends HttpServlet {

    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String id1 = request.getParameter("id1");
        String id2 = request.getParameter("id2");

        Key keyUser1 = KeyFactory.createKey("user", Long.parseLong(id1));
        Key keyUser2 = KeyFactory.createKey("user", Long.parseLong(id2));

        response.setContentType("text/html");
        response.setCharacterEncoding("UTF-8");

//		Entity e = new Entity("Friend", "f" + i);
//		e.setProperty("firstName", "first" + i);
//		e.setProperty("lastName", "last" + i);
//		e.setProperty("age", r.nextInt(100) + 1);
//      e.setProperty("friends", fset);

        DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
        Query q = new Query("user")
                .setFilter(CompositeFilterOperator.or(
                        new FilterPredicate("__key__", FilterOperator.EQUAL, id1),
                        new FilterPredicate("__key__", FilterOperator.EQUAL, id2)));
        PreparedQuery pq = datastore.prepare(q);
        List<Entity> result = pq.asList(FetchOptions.Builder.withDefaults());
        Gson gson = new Gson();
        String[] res = new String[2];
        if(result.size() == 2){
            Entity e = new Entity("follow");
            e.setProperty("id1", keyUser1);
            e.setProperty("id2", keyUser2);
            datastore.put(e);
            res[0] = "1";
            res[1] = "";
        }else{
            res[0] = "0";
            res[1] = "Un des deux utilisateurs n'existe pas";
        }
        response.getWriter().print(gson.toJson(res));

    }
}