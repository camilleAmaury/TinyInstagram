package foo;

import java.io.IOException;

import org.junit.Assert;
import org.junit.Test;

public class MainTest {

  @Test
  public void test() throws IOException {
    MockHttpServletResponse response = new MockHttpServletResponse();
    new Main().doGet(null, response);
    Assert.assertEquals("text/plain", response.getContentType());
    Assert.assertEquals("UTF-8", response.getCharacterEncoding());
    Assert.assertEquals("Hello App Engine!\r\n", response.getWriterContent().toString());
    int i = 0;
    System.out.println(i++);
  }
}
