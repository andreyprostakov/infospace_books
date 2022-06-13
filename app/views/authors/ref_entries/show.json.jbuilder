# frozen_string_literal: true

json.partial! 'authors/ref_entries/author', author: @author, counts_by_author: { @author.id => @author.books.count }
