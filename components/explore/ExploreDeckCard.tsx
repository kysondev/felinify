import { Badge } from "components/ui/Badge"
import { Button } from "components/ui/Button"
import { Card, CardContent } from "components/ui/Card"
import { Deck } from "db/types/models.types"
import { BookOpen, Star, ChevronRight, TrendingUp, User } from "lucide-react"
import Link from "next/link"
import { getUserWithId } from "services/user.service"
import Image from "next/image"

export const ExploreDeckCard = async ({ deck }: { deck: Deck }) => {
    const { data: user } = await getUserWithId(deck.userId);

    return (
        <Card className="group border border-border bg-white transition-all duration-200 hover:shadow-lg h-full flex flex-col">
            <CardContent className="p-0 flex flex-col h-full">
                <div className="p-4 flex-shrink-0">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-lg line-clamp-1 text-foreground group-hover:text-primary transition-colors">
                            {deck.name}
                        </h3>
                        <Badge variant="secondary" className="text-xs font-medium">
                            {deck.tags?.[0]?.name || "General"}
                        </Badge>
                    </div>
                    <p className="text-muted-foreground text-sm line-clamp-2 min-h-[2.5rem]">
                        {deck.description || "No description available"}
                    </p>
                </div>

                <div className="p-4 flex-1 flex flex-col">
                    <div className="grid grid-cols-3 gap-3 mb-4">
                        <div className="text-center p-2 bg-white rounded-lg border border-gray-100">
                            <BookOpen className="h-4 w-4 text-primary mx-auto mb-1" />
                            <p className="text-sm font-semibold text-foreground">{deck.flashcards?.length || 0}</p>
                            <p className="text-xs text-muted-foreground">Cards</p>
                        </div>
                        <div className="text-center p-2 bg-white rounded-lg border border-gray-100">
                            <Star className="h-4 w-4 text-yellow-500 mx-auto mb-1" />
                            <p className="text-sm font-semibold text-foreground">{deck.rating || "N/A"}</p>
                            <p className="text-xs text-muted-foreground">Rating</p>
                        </div>
                        <div className="text-center p-2 bg-white rounded-lg border border-gray-100">
                            <TrendingUp className="h-4 w-4 text-green-500 mx-auto mb-1" />
                            <p className="text-sm font-semibold text-foreground">{deck.studyCount || 0}</p>
                            <p className="text-xs text-muted-foreground">Studies</p>
                        </div>
                    </div>

                    <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-100">
                        <div className="flex items-center gap-2">
                            {user?.image ? (
                                <Image
                                    src={user.image}
                                    alt={user.name || "User"}
                                    width={24}
                                    height={24}
                                    className="rounded-full object-cover border border-gray-200"
                                />
                            ) : (
                                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                                    <User className="h-3 w-3 text-white" />
                                </div>
                            )}
                            <span className="text-sm text-muted-foreground">@{user?.name}</span>
                        </div>
                        <Link href={`/workspace/explore/deck/${deck.id}`} passHref>
                            <Button
                                className="font-medium h-8 px-4 text-sm"
                                size="sm"
                            >
                                View Details
                                <ChevronRight className="h-4 w-4 ml-1" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}