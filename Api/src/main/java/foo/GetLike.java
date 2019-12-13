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

@WebServlet(name = "GetLike", urlPatterns = { "/getlike" })
public class GetLike extends HttpServlet {

    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String id_post = request.getParameter("id_post");
        String id_user = request.getParameter("id_user");

        response.setContentType("text/html");
        response.setCharacterEncoding("UTF-8");

        DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
        Key grpKey = KeyFactory.createKey("post", Long.parseLong(id_post));
        Query q = new Query("like").setFilter(new FilterPredicate("id_post", FilterOperator.EQUAL, grpKey));


        PreparedQuery pq = datastore.prepare(q);
        List<Entity> result = pq.asList(FetchOptions.Builder.withDefaults());



        Gson gson = new Gson();
        String[] res = new String[2];

        res[0] = Integer.toString(result.size());
        res[1] = "0";

        if(id_user != null || !id_user.isEmpty() || id_user != ""){
            Key grpKeyUser = KeyFactory.createKey("user", Long.parseLong(id_user));
            Query q2 = new Query("like")
                    .setFilter(CompositeFilterOperator.and(
                            new FilterPredicate("id_user", FilterOperator.EQUAL, grpKeyUser),
                            new FilterPredicate("id_post", FilterOperator.EQUAL, grpKey)));
            PreparedQuery pq2 = datastore.prepare(q2);
            List<Entity> result2 = pq2.asList(FetchOptions.Builder.withDefaults());
            res[1] = result2.size() > 0 ? "1" : "0";
        }

        response.getWriter().print(gson.toJson(res));

    }
}