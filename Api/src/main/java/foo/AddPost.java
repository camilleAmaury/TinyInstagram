package foo;
import java.io.IOException;
import java.util.*;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.appengine.api.blobstore.BlobKey;
import com.google.appengine.api.blobstore.BlobstoreService;
import com.google.appengine.api.blobstore.BlobstoreServiceFactory;
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

@WebServlet(name = "AddPost", urlPatterns = { "/addpost" })
public class AddPost extends HttpServlet {

    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String description = request.getParameter("description");
        String id_user = request.getParameter("id_user");
        String picture = request.getParameter("picture"); // blob format
        String tags = request.getParameter("tags");
        Key keyUser = KeyFactory.createKey("user", Long.parseLong(id_user));

        response.setContentType("text/html");
        response.setCharacterEncoding("UTF-8");
        response.setHeader("Access-Control-Allow-Origin", "*");

//		Entity e = new Entity("Friend", "f" + i);
//		e.setProperty("firstName", "first" + i);
//		e.setProperty("lastName", "last" + i);
//		e.setProperty("age", r.nextInt(100) + 1);
//      e.setProperty("friends", fset);

        Gson gson = new Gson();
        String[] res = new String[2];

        if (!description.isEmpty() && !id_user.isEmpty() && !picture.isEmpty() && !tags.isEmpty()) {
            DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
            Calendar calendarTwoAgo = Calendar.getInstance(TimeZone.getTimeZone("UTC"));
            Date d = calendarTwoAgo.getTime();
            Entity e = new Entity("post");
            e.setProperty("description", description);
            e.setProperty("id_user", id_user);
            e.setProperty("picture", picture);
            e.setProperty("tags", tags);
            e.setProperty("date", d);
            e.setProperty("id_user", keyUser);
            datastore.put(e);
            res[0] = "1";
            res[1] = "";
        } else {
            res[0] = "0";
            res[1] = "Merci de remplir tous les champs.";
        }
        response.getWriter().print(gson.toJson(res));
    }
}