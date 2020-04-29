export default {
    strip_tags: function (input) {
        var tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi, // Match any html tag
            commentsAndPhpTags = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi; // Match <!--, -->, <?, <?php and ?>
        return input.replace(commentsAndPhpTags, '').replace(tags, ''); // Just replace it by an empty string
    }
}