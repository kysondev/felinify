import { Badge } from "components/ui/Badge"
import { Button } from "components/ui/Button"
import { Card, CardContent } from "components/ui/Card"
import { Deck } from "db/types/models.types"
import { BookOpen, Star, TrendingUp, User, ChevronRight } from "lucide-react"
import Link from "next/link"
import { getUserWithId } from "services/user.service"

export const ExploreDeckCard = async ({ deck }: { deck: Deck }) => {
    const { data: user } = await getUserWithId(deck.userId);
    return (
        <Card className="group border-border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg bg-card">
            <CardContent className="p-6">
                <div className="flex justify-between items-start mb-1">
                    <h3 className="font-semibold text-xl text-foreground line-clamp-1 group-hover:text-primary transition-colors duration-300">
                        {deck.name}
                    </h3>
                    <Badge variant="secondary" className="text-xs font-medium">
                        {deck.tags?.[0]?.name || "Uncategorized"}
                    </Badge>
                </div>

                <p className="text-muted-foreground text-sm line-clamp-2 mb-4 min-h-[40px] leading-relaxed">
                    {deck.description || "No description available"}
                </p>

                <div className="grid grid-cols-3 gap-3 mb-5">
                    <div className="text-center p-3 bg-muted/30 rounded-lg border border-border/40">
                        <div className="flex justify-center mb-2">
                            <div className="p-1.5 bg-primary/10 rounded-md">
                                <BookOpen className="h-4 w-4 text-primary" />
                            </div>
                        </div>
                        <p className="text-xs font-bold text-foreground">{deck.flashcards?.length || 0}</p>
                        <p className="text-xs text-muted-foreground">Cards</p>
                    </div>
                    
                    <div className="text-center p-3 bg-muted/30 rounded-lg border border-border/40">
                        <div className="flex justify-center mb-2">
                            <div className="p-1.5 bg-primary/10 rounded-md">
                                <Star className="h-4 w-4 text-yellow-500" />
                            </div>
                        </div>
                        <p className="text-xs font-bold text-foreground">{deck.rating || "N/A"}</p>
                        <p className="text-xs text-muted-foreground">Rating</p>
                    </div>
                    
                    <div className="text-center p-3 bg-muted/30 rounded-lg border border-border/40">
                        <div className="flex justify-center mb-2">
                            <div className="p-1.5 bg-primary/10 rounded-md">
                                <TrendingUp className="h-4 w-4 text-primary" />
                            </div>
                        </div>
                        <p className="text-xs font-bold text-foreground">{deck.studyCount || 0}</p>
                        <p className="text-xs text-muted-foreground">Studies</p>
                    </div>
                </div>

                <div className="p-4 rounded-lg border border-border/60 bg-muted/50 mb-5">
                    <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium text-foreground">Created by</span>
                        <span className="text-sm font-semibold text-primary">@{user?.name}</span>
                    </div>
                </div>

                <Link href={`/workspace/explore/deck/${deck.id}`} passHref className="w-full block">
                    <Button 
                        className="w-full font-medium group-hover:bg-primary/90 transition-colors duration-300"
                        size="sm"
                    >
                        View Deck Details
                        <ChevronRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                    </Button>
                </Link>
            </CardContent>
        </Card>
    )
}